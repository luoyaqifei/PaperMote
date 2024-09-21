import { fetchNotes } from "@/app/lib/data";
import { Note } from "@/app/lib/definitions";
import { Card, CardBody, CardHeader } from '@nextui-org/react';
import { backgroundColor } from "../style-variants/variables";
import { headline } from "../style-variants/headline";

export default async function NoteList({bookId}: {bookId: string}) {
    const notes: Note[] = await fetchNotes(bookId);
    return (
        <div className="space-y-4">
            <h3 className={headline({color: 'primary', size: 'lg'})}>Notes</h3>
            {notes.map((note) => (
                <Card key={note.id} className="bg-white">
                    <CardHeader className={`${backgroundColor.primary} font-semibold text-lg`}>{note.title}</CardHeader>
                    <CardBody>
                        <div className="prose" dangerouslySetInnerHTML={{ __html: note.content }} />
                    </CardBody>
                </Card>
            ))}
        </div>
    )
}