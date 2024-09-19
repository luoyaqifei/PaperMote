import { fetchBooks } from "@/app/lib/data";
import { Card, Link } from "@nextui-org/react";

export default async function BookList() {
  const books = await fetchBooks();
  return (
    <Card className="p-6 bg-white">
      <h2 className="text-2xl font-bold mb-4 text-teal-600">Your Books</h2>
      <ul className="space-y-4">
        {books.map((book) => (
          <li key={book.id}>
            <Link href={`/dashboard/books/${book.id}`} className="block">
              <Card className="p-4 hover:bg-teal-50 transition-colors">
                <p className="font-semibold text-teal-700">{book.title}</p>
                <p className="text-sm text-gray-600">{book.author}</p>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </Card>
  );
}