"use client";
import { Book } from "@/app/lib/definitions";
import { Button, Divider, Link, useDisclosure } from "@nextui-org/react";
import { BookOpenIcon, TrashIcon } from "@heroicons/react/24/outline";
import AddBook from "@/app/ui/components/add-book";
import BookCard from "@/app/ui/components/book-card";
import { deleteBook } from "@/app/lib/actions";
import { setToast } from "@/app/lib/client-utils";
import { SubmissionResult } from "@conform-to/react";
import DeleteModal from "@/app/ui/components/delete-modal";
import { button } from "@/app/ui/style-variants/button";

export default function BookList({ books }: { books: Book[] }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  return (
    <section className="flex flex-wrap justify-center gap-4 p-4 bg-wood-texture">
      <AddBook />
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book.id} className="relative group">
            <Link href={`/dashboard/books/${book.id}`} className="block">
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
            <Button
              color="danger"
              variant="flat"
              startContent={<TrashIcon className="w-4 h-4" />}
              className={`absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bottom-0 right-0 ${button(
                { color: "danger" },
              )} p-4 hover:cursor-pointer hover:scale-110`}
              onClick={() => {
                onOpen();
              }}
            />
            <DeleteModal
              isOpen={isOpen}
              onOpenChange={onOpenChange}
              onClose={onClose}
              title={"Delete Book"}
              action={async () => {
                const result = await deleteBook(book.id);
                if (result.status === "error") {
                  setToast(result as SubmissionResult<string[]>);
                } else {
                  onClose();
                }
              }}
            >
              <p className="font-semibold text-lg">
                Are you sure you want to delete this book?
              </p>
              <p>All the notes will be deleted too.</p>
            </DeleteModal>
          </div>
        ))
      ) : (
        <div className="w-full text-center">
          <p className="text-gray-500">Add your first book to get started!</p>
        </div>
      )}
    </section>
  );
}
