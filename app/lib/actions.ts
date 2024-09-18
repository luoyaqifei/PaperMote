"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { AddBookSchema, UpdateUserSchema } from "./schema";
import { saltAndHashPassword } from "./utils";
import { generateAvatar } from "./client-utils";
import { auth, signIn, signOut, unstable_update } from "@/auth";
import { AuthError } from "next-auth";
import { generateFromEmail } from "unique-username-generator";
import { parseWithZod } from "@conform-to/zod";
import { SignupSchema } from "./schema";
import { User } from "./definitions";

export async function signup(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: SignupSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const { email, password } = submission.value;
  try {
    const userExists = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (userExists.rows.length > 0) {
      return {
        errors: {
          email: ["User already exists"],
        },
        message: "User already exists",
      };
    }
    const hashedPassword = await saltAndHashPassword(password);
    const username = generateFromEmail(email);
    const avatar = generateAvatar(username);
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
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
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
  await signOut({redirectTo: "/"});
  revalidatePath("/");
}

export async function updateUser(prevState: unknown, formData: FormData) {
  console.log("user profile", formData);
  const submission = parseWithZod(formData, {
    schema: UpdateUserSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  console.log("submission", submission);
  const { username, email, id } = submission.value;
  try {
    const users = await sql<User>`
    UPDATE users 
    SET email = ${email}, username = ${username}, avatar = ${generateAvatar(username)}
    WHERE id = ${id} RETURNING *`;
    await unstable_update({user: users.rows[0]});
  } catch (error) {
    return {
      message: "Database Error: Failed to update user",
    };
  }

  revalidatePath("/");
  redirect("/");
}