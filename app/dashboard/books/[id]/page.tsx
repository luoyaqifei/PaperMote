import NoteList from "@/app/ui/components/note-list";
import AddNote from "@/app/ui/components/add-note";
import BookDetailCard from "@/app/ui/components/book-detail-card";
import { Divider } from "@nextui-org/react";
import { fetchNotes } from "@/app/lib/data";
import { Note } from "@/app/lib/definitions";

export default async function BookPage({ params }: { params: { id: string } }) {
    const { id } = params;
    const notes: Note[] = await fetchNotes(id);
    return (
        <div className="p-8 bg-wood-texture flex flex-col">
            <div>
                <BookDetailCard bookId={id} />
            </div>
            <Divider className="my-8" />
            <div className="flex flex-col flex-grow">
                <div className="flex justify-end mb-4">
                  <AddNote bookId={id} />
                </div>
                <NoteList notes={notes} />
            </div>
        </div>
    )
}