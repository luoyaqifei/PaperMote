"use client";
import { searchBooksFromApi } from "@/app/lib/data";
import { updateBookFromApi } from "@/app/lib/actions";
import { Book, BookFromApi } from "@/app/lib/definitions";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { useState } from "react";
import Image from "next/image";
import { SubmissionResult } from "@conform-to/react";
import { setToast } from "@/app/lib/client-utils";

export default function SearchBook({ book }: { book: Book }) {
  const [isOpen, setIsOpen] = useState(false);
  const [bookResults, setBookResults] = useState<BookFromApi[]>([]);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement>,
    bookResult: BookFromApi
  ) => {
    e.preventDefault();
    const result = await updateBookFromApi(bookResult, book.id);
    setToast(result as SubmissionResult<string[]>);
    setIsOpen(false);
  };
  return (
    <>
      <Button
        startContent={<MagnifyingGlassIcon className="size-4" />}
        className="mt-4 ml-auto bg-indigo-600 hover:bg-indigo-700"
        color="secondary"
        variant="solid"
        size="sm"
        onClick={async () => {
          setIsOpen(true);
          const results = await searchBooksFromApi(book);
          setBookResults(results);
        }}
      >
        Search Online
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Search Book"
        classNames={{
          base: "bg-white",
          backdrop: "bg-black/50",
          header: "bg-teal-600 text-white",
          body: "bg-white",
          footer: "bg-teal-600 text-white",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            Online Book Results
          </ModalHeader>
          <ModalBody>
            {bookResults.map((bookResult: BookFromApi) => (
              <div
                key={bookResult.title}
                className="flex items-center space-x-4 mb-4 hover:bg-gray-100 p-2 rounded-md"
              >
                {bookResult.imageLinks?.thumbnail && (
                  <Image
                    src={bookResult.imageLinks.thumbnail}
                    alt={bookResult.title}
                    width={50}
                    height={75}
                    className="object-cover"
                  />
                )}
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {bookResult.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {bookResult.authors?.join(", ")}
                    </p>
                  </div>
                  <Button
                    className="bg-teal-600 hover:bg-teal-700 ml-auto"
                    color="primary"
                    size="sm"
                    variant="solid"
                    onClick={(e) => handleClick(e, bookResult)}
                  >
                    Apply
                  </Button>
                </div>
              </div>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
