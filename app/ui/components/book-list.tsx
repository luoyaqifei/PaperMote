import { Book } from "@/app/lib/definitions";
import { Divider, Link } from "@nextui-org/react";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import AddBook from "@/app/ui/components/add-book";
import BookCard from "@/app/ui/components/book-card";

export default async function BookList({ books }: { books: Book[] }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 p-4 bg-wood-texture">
      <AddBook />
      {books.length > 0 ? (
        books.map((book) => (
          <Link
            key={book.id}
            href={`/dashboard/books/${book.id}`}
            className="block"
          >
            <BookCard backgroundImage={book.cover ?? "/book-cover.png"}>
              <div className="flex items-center justify-center text-lg">
                <BookOpenIcon className="w-4 h-4 mr-1 flex-shrink-0" />
                <span className="overflow-hidden max-w-full break-words">
                  {book.title}
                </span>
              </div>
			  <Divider className="my-4" />
              <div className="text-xs mt-1 break-words">{book.author}</div>
            </BookCard>
          </Link>
        ))
      ) : (
        <div className="w-full text-center">
          <p className="text-gray-500">Add your first book to get started!</p>
        </div>
      )}
    </div>
  );
}
