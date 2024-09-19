import { fetchBooks } from "@/app/lib/data";
import { Card, Link } from "@nextui-org/react";

export default async function BookList({ books }: { books: Book[] }) {
  return (
    <>
      <ul className="space-y-4">
        { books.length > 0 ? books.map((book) => (
          <li key={book.id}>
            <Link href={`/dashboard/books/${book.id}`} className="block">
              <Card className="p-4 hover:bg-teal-50 transition-colors">
                <p className="font-semibold text-teal-700">{book.title}</p>
                <p className="text-sm text-gray-600">{book.author}</p>
              </Card>
            </Link>
          </li>
        )) : <p className="text-center text-gray-500">Add your first book to get started!</p>}
      </ul>
      </>
  );
}