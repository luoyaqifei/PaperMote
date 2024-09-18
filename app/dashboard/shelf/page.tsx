import AddBook from "@/app/ui/shelf/add-book";
import BookList from "@/app/ui/shelf/book-list";


export default function ShelfPage() {
  // example: https://www.googleapis.com/books/v1/volumes?q=Exhalation&inauthor:"Ted Chiang"
  // const books = await fetchBooks();
  return (
    <>
      <AddBook />
      <BookList />
    </>
  );
}
