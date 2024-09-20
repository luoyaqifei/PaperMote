import { fetchNotes } from "@/app/lib/data";
import { Note } from "@/app/lib/definitions";
import { Card, CardBody, CardHeader } from '@nextui-org/react';

export default async function NoteList({bookId}: {bookId: string}) {
    const notes: Note[] = await fetchNotes(bookId);
    return (
        <div className="space-y-4">
            <h3 className="text-2xl font-bold mb-4 text-teal-600">Notes</h3>
            {notes.map((note) => (
                <Card key={note.id} className="bg-white">
                    <CardHeader className="bg-teal-100 font-semibold text-lg">{note.title}</CardHeader>
                    <CardBody>
                        <div className="prose" dangerouslySetInnerHTML={{ __html: note.content }} />
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}