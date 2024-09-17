import { TypeOf } from "zod";
import { LoginSchema } from "./schema";

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    avatar: string;
    created_at: string;
    updated_at: string;
}

export interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    user_id: string;
    cover: string;
    published_date: string;
    page_count: number;
    created_at: string;
    updated_at: string;
}

export interface Note {
    id: string;
    title: string;
    content: string;
    book_id: string;
    user_id: string;
    book_location: string;
    created_at: string;
    updated_at: string;
}

export interface BookWithNotes extends Book {
    notes: Note[];
}

export interface UserWithBooks extends User {
    books: BookWithNotes[];
}

export type LoginModel = TypeOf<typeof LoginSchema>;
