import { fetchBooks } from "@/app/lib/data";

export default async function BookList() {
  const books = await fetchBooks();
  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
}