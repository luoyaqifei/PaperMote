"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Chip,
} from "@nextui-org/react";
import { colorPalette } from "@/app/ui/style-variants/variables";
import { headline } from "@/app/ui/style-variants/headline";
import { Note } from "@/app/lib/definitions";

export default function NoteList({ notes }: { notes: Note[] }) {
  return (
    <section className="space-y-4">
      <h3 className={headline({ color: "primary", size: "lg" })}>Notes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <Card key={note.id} className="w-full" as="a" href={`/dashboard/books/${note.book_id}/edit-note/${note.id}`}>
            <CardHeader className={`font-bold ${colorPalette.primary} flex justify-between`}>
              {note.title}
              {note.book_location && (
                <Chip variant="dot" size="sm" color="primary">
                  Page <span className="font-bold text-lg">{note.book_location}</span>
                </Chip>
              )}
            </CardHeader>
            <CardBody>
              <div dangerouslySetInnerHTML={{ __html: note.content }} className="mb-2" />
            </CardBody>
          </Card>
        ))}
      </div>
    </section>
  );
}
