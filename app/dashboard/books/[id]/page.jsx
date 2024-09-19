import NoteList from "@/app/ui/book/note-list";
import AddNote from "@/app/ui/note/add-note";
import BookCard from "@/app/ui/book/book-card";

export default async function BookPage({ params }) {
    const { id } = params;
    return (
        <div className="p-8">
            <BookCard bookId={id} />
            <div className="my-8">
                <AddNote bookId={id} />
            </div>
            <NoteList bookId={id} />
        </div>
    )
}