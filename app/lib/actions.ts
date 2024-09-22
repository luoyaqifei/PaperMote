"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  AddBookSchema,
  AddNoteSchema,
  LoginSchema,
  UpdateBookSchema,
  UpdateUserSchema,
} from "./schema";
import { saltAndHashPassword } from "./utils";
import { generateAvatar } from "./client-utils";
import { signIn, signOut, unstable_update } from "@/auth";
import { AuthError } from "next-auth";
import { generateFromEmail } from "unique-username-generator";
import { parseWithZod } from "@conform-to/zod";
import { SignupSchema } from "./schema";
import { BookFromApi, User } from "./definitions";
import { getCurrentUser } from "./data";

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
        status: "error",
      };
    }
    const hashedPassword = saltAndHashPassword(password);
    const username = generateFromEmail(email);
    const avatar = generateAvatar(username);
    await sql`INSERT INTO users (email, password, username, avatar) VALUES (${email}, ${hashedPassword}, ${username}, ${avatar})`;
  } catch (error) {
    return {
      message: "Database Error: Failed to create user",
      status: "error",
    };
  }
  await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  return { message: "Signed up successfully", status: "success" };
}

export async function authenticate(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: LoginSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const { email, password } = submission.value;
  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
            status: "error",
          };
        default:
          return {
            message: "Something went wrong",
            status: "error",
          };
      }
    }
    throw error;
  }
  return { message: "Signed in successfully", status: "success" };
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
  revalidateTag("user");
  revalidatePath("/");
  return { message: "Signed out successfully", status: "success" };
}

export async function updateUser(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: UpdateUserSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  // TODO: check if email is already taken
  const { username, email, id } = submission.value;
  try {
    const users = await sql<User>`
    UPDATE users 
    SET email = ${email}, username = ${username}, avatar = ${generateAvatar(
      username
    )}
    WHERE id = ${id} RETURNING *`;
    unstable_update({ user: users.rows[0] });
  } catch (error) {
    return {
      message: "Database Error: Failed to update user",
      error: JSON.parse(JSON.stringify(error)),
    };
  }
  revalidateTag("user");
  revalidatePath("/dashboard/user-profile");
  return { message: "User updated successfully", status: "success" };
}

export async function addBook(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: AddBookSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const { title, author } = submission.value;
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;
  const user = await getCurrentUser();
  let book_id: string;
  try {
    const books = await sql`
    INSERT INTO books 
    (title, author, created_at, updated_at, user_id) 
    VALUES (${title}, ${author}, ${createdAt}, ${updatedAt}, ${user?.id}) RETURNING *`;
    book_id = books.rows[0].id;
  } catch (error) {
    return {
      message: "Database Error: Failed to add book",
      status: "error",
    };
  }
  revalidatePath("/dashboard");
  return {
    message: `Book ${title} added successfully`,
    status: "success",
    book_id,
  };
}

export async function updateBookFromApi(book: BookFromApi, book_id: string) {
  const bookData = {
    title: book.title,
    author: book.authors?.join(", "),
    description: book.description,
    published_date: book.publishedDate,
    page_count: book.pageCount,
    cover: book.imageLinks?.thumbnail ?? "/book-cover.png",
    updated_at: new Date().toISOString(),
  };
  try {
    await sql`
      UPDATE books
      SET title = ${bookData.title}, author = ${bookData.author}, description = ${bookData.description}, 
      cover = ${bookData.cover}, published_date = ${bookData.published_date}, 
      page_count = ${bookData.page_count}, updated_at = ${bookData.updated_at}
      WHERE id = ${book_id}
    `;
  } catch (error) {
    return {
      message:
        "Database Error: Failed to update book " +
        JSON.stringify(error, null, 2),
      status: "error",
      error: JSON.parse(JSON.stringify(error)),
    };
  }
  revalidatePath(`/dashboard/books/${book_id}`);
  return { message: "Book information updated successfully", status: "success" };
}

export async function updateBook(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: UpdateBookSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  const { title, author, description, id } = submission.value;
  const updated_at = new Date().toISOString();
  try {
    await sql`
      UPDATE books
      SET title = ${title}, author = ${author}, description = ${description}, updated_at = ${updated_at}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: "Database Error: Failed to update book",
      status: "error",
    };
  }
  revalidatePath(`/dashboard/books/${id}`);
  return { message: "Book information updated successfully", status: "success" };
}

export async function addNote(prevState: unknown, formData: FormData) {
  const submission = parseWithZod(formData, {
    schema: AddNoteSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }
  console.log(submission.value);
  const { title, content, book_id, book_location } = submission.value;

  try {
    await sql`
      INSERT INTO notes (title, content, book_id, book_location)
      VALUES (${title}, ${content}, ${book_id}, ${book_location})
    `;
  } catch (error) {
    console.log(error);
    return {
      message: "Database Error: Failed to add note",
      status: "error",
    };
  }

  revalidatePath(`/dashboard/books/${book_id}`);
  return { message: "Note added successfully", status: "success" };
}
