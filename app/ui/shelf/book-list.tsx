import { Book } from "@/app/lib/definitions";
import { Card, Link } from "@nextui-org/react";
import { BookOpenIcon } from "@heroicons/react/24/outline";

export default async function BookList({ books }: { books: Book[] }) {

	return (
		<div className="flex flex-wrap justify-center gap-4 p-4 bg-wood-texture">
			{books.length > 0 ? books.map((book) => (
				<Link key={book.id} href={`/dashboard/books/${book.id}`} className="block">
					<Card 
						className="book-spine w-32 h-48 md:w-40 md:h-60 lg:w-48 lg:h-72 rounded-l-lg shadow-md transform hover:scale-105 transition-transform duration-300" 
						style={{ 
							backgroundImage: `url(${book.cover})`, 
							backgroundSize: 'cover', 
							backgroundPosition: 'center',
							backgroundColor: '#f0f0f0',
						}}
					>
						<div className="h-full flex flex-col justify-center p-2 bg-black bg-opacity-50">
							<div className="writing-mode-vertical text-sm font-bold text-white overflow-hidden text-center">
								<div className="flex items-center justify-center text-lg">
									<BookOpenIcon className="w-4 h-4 mr-1 flex-shrink-0" />
									<span className="overflow-hidden max-w-full break-words">
										{book.title}
									</span>
								</div>
								<div className="text-xs mt-1 break-words">{book.author}</div>
							</div>
						</div>
					</Card>
				</Link>
			)) : (
				<div className="w-full text-center">
					<p className="text-gray-500">Add your first book to get started!</p>
				</div>
			)}
		</div>
	);
}