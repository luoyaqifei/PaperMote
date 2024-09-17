"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AddBookSchema } from "./schema";
import { saltAndHashPassword } from "./utils";
import { LoginModel } from "./definitions";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import { generateFromEmail } from "unique-username-generator";
import { parseWithZod } from "@conform-to/zod";
import { SignupSchema } from "./schema";

export async function signup(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: SignupSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  console.log("submission", submission);
  const { email, password } = submission.value;
  try {
    const hashedPassword = await saltAndHashPassword(password);
    const username = generateFromEmail(email);
    const avatar = `https://api.dicebear.com/5.x/initials/svg?seed=${username}`;
    await sql`INSERT INTO users (email, password, username, avatar) VALUES (${email}, ${hashedPassword}, ${username}, ${avatar})`;
  } catch (error) {
    return {
      message: "Database Error: Failed to create user",
    };
  }

  redirect("/dashboard");
}

export async function authenticate(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: SignupSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  console.log("submission", submission);
  const { email, password } = submission.value;
  try {
    await signIn("credentials", { email, password }, { redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };
        default:
          return {
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
}

export async function addBook(formData: FormData) {
  const validatedFields = AddBookSchema.safeParse({
    title: formData.get("title"),
    author: formData.get("author"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fill in all the required fields.",
    };
  }
  const { title, author } = validatedFields.data;
  const createdAt = new Date().toISOString().split("T")[0];
  const updatedAt = createdAt;

  revalidatePath("/shelf");
  redirect("/shelf");
}

export async function signOutAction() {
  await signOut();
  redirect("/");
}
