import { fetchNotes } from "@/app/lib/data";
import { Note } from "@/app/lib/definitions";

export default async function NoteList({bookId}: {bookId: string}) {
    const notes = await fetchNotes(bookId);
    return (
        <div>
            <h1>Notes</h1>
            <ul>
                {notes.map((note: Note) => (
                    <li key={note.id}>{note.title}</li>
                ))}
            </ul>
        </div>
    )
}