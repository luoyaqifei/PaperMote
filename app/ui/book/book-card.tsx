import { fetchBook } from "@/app/lib/data";
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import SearchBook from "./search-book";
import EditBook from "./edit-book";
import Image from "next/image";
import { headline } from "../style-variants/headline";
import { backgroundColor } from "../style-variants/variables";

export default async function BookCard({ bookId }: { bookId: string }) {
    const book = await fetchBook(bookId);
    if (!book) return null;

    return (
        <Card className="bg-white">
            <CardHeader className={`${backgroundColor.primary}  text-white flex justify-between items-center`}>
                <h2 className={headline({size: "2xl", color: "primary"})}>{book.title}</h2>
                <div className="flex flex-col lg:flex-row gap-4">
                    <EditBook book={book} />
                    <SearchBook book={book} />
                </div>
            </CardHeader>
            <CardBody>
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-shrink-0">
                    {book.cover ? <Image 
                      src={book.cover} 
                      alt={book.title} 
                      width={150} 
                      height={225} 
                      className="rounded-lg shadow-md"
                    /> : <div className="w-150 h-225 bg-gray-200 rounded-lg shadow-md"></div>}
                  </div>
                  <div className="flex-grow">
                    <p className="text-gray-700 font-semibold mb-2">Author: {book.author}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                        {book.description?.split(' ').slice(0, 100).join(' ')}
                        {book.description?.split(' ').length > 100 ? "..." : ""}
                    </p>
                  </div>
                </div>
            </CardBody>
        </Card>
    );
}