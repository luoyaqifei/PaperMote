import { fetchBook } from "@/app/lib/data";
import { Card, CardBody, CardHeader, Chip } from "@nextui-org/react";
import SearchBook from "@/app/ui/components/search-book";
import EditBook from "@/app/ui/components/edit-book";
import Image from "next/image";
import { headline } from "@/app/ui/style-variants/headline";
import { backgroundColor } from "@/app/ui/style-variants/variables";
import { BookmarkSquareIcon } from "@heroicons/react/24/outline";
import { Book } from "@/app/lib/definitions";

export default async function BookDetailCard({ book }: { book: Book }) {


  return (
    <Card className="bg-white">
      <CardHeader
        className={`${backgroundColor.primary}  text-white flex justify-between items-center`}
      >
        <h2 className={headline({ size: "2xl", color: "primary" })}>
          {book.title}
        </h2>
        <div className="flex flex-col lg:flex-row gap-4">
          <EditBook book={book} />
          <SearchBook book={book} />
        </div>
      </CardHeader>
      <CardBody>
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-shrink-0">
            {book.cover ? (
              <Image
                src={book.cover}
                alt={book.title}
                width={150}
                height={225}
                className="rounded-lg shadow-md"
              />
            ) : (
              <div className="w-150 h-260 bg-gray-200 rounded-lg shadow-md">
                <Image
                  src="/book-cover.png"
                  alt="Book cover"
                  width={150}
                  height={225}
                />
              </div>
            )}
          </div>
          <div className="flex-grow flex flex-col gap-2">
            <div className="flex-grow flex flex-row flex-wrap gap-2">
              {book.author ? (
                <Chip color="primary">by {book.author}</Chip>
              ) : null}
              {book.published_date ? (
                <Chip color="secondary">
                  published on{" "}
                  {new Date(book.published_date).toLocaleDateString()}
                </Chip>
              ) : null}
              {book.page_count ? (
                <Chip
                  color="danger"
                  startContent={<BookmarkSquareIcon className="w-4 h-4" />}
                >
                  {book.page_count} pages
                </Chip>
              ) : null}
            </div>
            <div className="flex-grow flex flex-col gap-2">
              {book.description ? (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {book.description.split(" ").slice(0, 100).join(" ")}
                  {book.description.split(" ").length > 100 ? "..." : ""}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
