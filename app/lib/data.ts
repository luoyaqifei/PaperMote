"use server";

import { sql } from "@vercel/postgres";
import { Book, BookFromApi, Note, User } from "./definitions";
import { auth } from "@/auth";

export const fetchBooks = async () => {
  const user = await getCurrentUser();
  if (!user) {
    return [];
  }
  const userId = user.id;
  try {
    const data = await sql<Book>`
        SELECT * FROM books 
        WHERE user_id = ${userId} ORDER BY updated_at DESC`;
    return data.rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchBooksFromApi = async (book: Book) => {
  if (!book.title) return;
  let query = `intitle:"${book.title}"`;
  if (book.author) {
    query += `+inauthor:"${book.author}"`;
  }
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=5`
  );
  const data = await response.json();
  return data?.items?.map((item: { volumeInfo: BookFromApi }) => item.volumeInfo) ?? [];
};

export const fetchBook = async (bookId: string) => {
  try {
    const data =
      await sql<Book>`SELECT * FROM books WHERE id=${bookId} LIMIT 1`;
    return data.rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchNotes = async (bookId: string) => {
  try {
    const data = await sql<Note>`SELECT * FROM notes WHERE book_id=${bookId} ORDER BY updated_at DESC`;
    return data.rows;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchNote = async (noteId: string) => {
  try {
    const data = await sql<Note>`SELECT * FROM notes WHERE id=${noteId} LIMIT 1`;
    return data.rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getNoteWithLastLocation = async (bookId: string) => {
  try {
    const data = await sql<Note>`SELECT * FROM notes WHERE book_id=${bookId} and book_location is not null ORDER BY book_location DESC LIMIT 1`;
    return data.rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserByEmail = async (email: string) => {
  try {
    const data =
      await sql<User>`SELECT * FROM users WHERE email=${email} LIMIT 1`;
    return data.rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const data = await sql<User>`SELECT * FROM users WHERE id=${id} LIMIT 1`;
    return data.rows[0];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getCurrentUser = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    return null;
  }
  return user;
};
