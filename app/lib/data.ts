'use server';

import {sql} from "@vercel/postgres";
import { Book, Note, User } from "./definitions";
import { auth } from "@/auth";

export const fetchBooks = async () => {
    try {
        const data = await sql<Book[]>`SELECT * FROM books ORDER BY updated_at DESC`;
        return data.rows;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const searchBooksFromApi = async (query: string) => {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`);
    const data = await response.json();
    return data;
}


export const fetchNotes = async (bookId: string) => {
    try {
        const data = await sql<Note[]>`SELECT * FROM notes WHERE book_id = ${bookId}`;
        return data.rows;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export const getUser = async (email: string) => {
    try {
        const data = await sql<User>`SELECT * FROM users WHERE email = ${email} LIMIT 1`;
        return data.rows[0];
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getCurrentUser = async () => {
    const session = await auth();
    const user = session?.user;
    if (!user) {
        return null;
    }
    const userFromDb = await getUser(user.email as string);
    return userFromDb;
}