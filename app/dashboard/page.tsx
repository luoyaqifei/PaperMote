import AddBook from "@/app/ui/shelf/add-book";
import BookList from "@/app/ui/shelf/book-list";
import { fetchBooks } from "../lib/data";
import ShelfInfo from "../ui/shelf/shelf-info";
import { headline } from "../ui/style-variants/headline";

export default async function DashboardPage() {
  const books = await fetchBooks();

  return (
    <div className="container flex flex-col flex-grow h-full mx-auto px-4 py-8">
      <h1 className={headline({size: "3xl", color: "primary"})}>Your Bookshelf</h1>
      <div className="mb-8 flex-grow flex flex-row justify-between">
        <ShelfInfo books={books} />
        <AddBook />
      </div>
      <BookList books={books} />
    </div>
  );
}
