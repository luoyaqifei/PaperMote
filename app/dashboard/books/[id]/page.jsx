import NoteList from "@/app/ui/book/note-list";
import AddNote from "@/app/ui/note/add-note";
import BookCard from "@/app/ui/book/book-card";

export default async function BookPage({ params }) {
    const { id } = params;
    return (
        <div className="p-8 bg-wood-texture flex flex-col">
            <div>
                <BookCard bookId={id} />
            </div>
            <div className="flex flex-col flex-grow my-8">
                <div className="flex justify-end mb-4">
                  <AddNote bookId={id} />
                </div>
                <NoteList bookId={id} />
            </div>
        </div>
    )
}