import { Book } from "@/app/lib/definitions";

export default function ShelfInfo({ books }: { books: Book[]}) {
  return <div>
    <div>
        {books.length > 0 
        ? <><p>You have {books.length} books in your shelf.</p>
        <p>The last book you read is {books[0].title}</p> </>
        : <p>Add your first book to get started!</p>}
    </div>
  </div>;
}