import { fetchBooks } from "@/app/lib/data";
import { Link } from "@nextui-org/react";

export default async function BookList() {
  const books = await fetchBooks();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Book Shelf</h2>
      <ul className="list-none pl-0">
        {books.map((book) => (
          <li key={book.id} className="mb-2 flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
            </svg>
            <Link href={`/dashboard/books/${book.id}`}>
              <div>
                <div className="font-semibold">{book.title}</div>
                <div className="text-sm text-gray-600">{book.author}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}