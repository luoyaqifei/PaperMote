import BookList from "@/app/ui/components/book-list";
import { fetchBooks } from "@/app/lib/data";
import ShelfInfo from "@/app/ui/components/shelf-info";
import { headline } from "@/app/ui/style-variants/headline";

export default async function DashboardPage() {
  const books = await fetchBooks();
  return (
    <article className="container flex flex-col flex-grow h-full mx-auto px-4 py-8">
      <h1 className={headline({size: "3xl", color: "primary"})}>Your Bookshelf</h1>
      <div className="mb-8 flex flex-col justify-between">
        <section className="flex flex-col justify-between">
          <ShelfInfo books={books} />
        </section>
        <section>
          <BookList books={books} />
        </section>
      </div>
    </article>
  );
}
