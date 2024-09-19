import { fetchBook } from "@/app/lib/data";
import { Card, CardBody, CardHeader } from '@nextui-org/react';

export default async function BookCard({ bookId }: { bookId: string }) {
    const book = await fetchBook(bookId);
    if (!book) return null;

    return (
        <Card className="bg-white">
            <CardHeader className="bg-teal-600 text-white">
                <h2 className="text-2xl font-bold">{book.title}</h2>
            </CardHeader>
            <CardBody>
                <p className="text-gray-600 mb-2">Author: {book.author}</p>
                <p>{book.description}</p>
            </CardBody>
        </Card>
    );
}