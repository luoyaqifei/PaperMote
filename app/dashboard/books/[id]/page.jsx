import NoteList from "@/app/ui/book/note-list";
import AddNote from "@/app/ui/book/add-note";

export default async function BookPage({ params }) {
    const { id } = params;
    return (
        <>
            <div>
                <AddNote bookId={id} />
                <NoteList bookId={id} />
            </div>
        </>
    )
}