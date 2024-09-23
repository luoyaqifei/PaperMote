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
  published_date?: string;
  page_count?: number;
  created_at: string;
  updated_at: string;
}

export interface BookFromApi {
  title: string;
  authors: string[];
  description: string;
  pageCount: number;
  imageLinks: {
    thumbnail: string;
  };
  publishedDate: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  book_id: string;
  book_location: number;
  created_at: string;
  updated_at: string;
}
