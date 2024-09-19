import AddBook from "@/app/ui/shelf/add-book";
import BookList from "@/app/ui/shelf/book-list";

export default function ShelfPage() {
	return (
		<div className="p-8">
			<h1 className="text-3xl font-bold mb-6 text-teal-600">Your Bookshelf</h1>
			<div className="mb-8">
				<AddBook />
			</div>
			<BookList />
		</div>
	);
}
