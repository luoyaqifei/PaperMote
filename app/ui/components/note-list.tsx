"use client";
import { headline } from "@/app/ui/style-variants/headline";
import { Note } from "@/app/lib/definitions";
import NoteCard from "./note-card";

export default function NoteList({ notes }: { notes: Note[] }) {
  if (!notes || notes.length === 0) {
    return null;
  }
  
  return (
    <section className="space-y-4">
      <h3 className={headline({ color: "primary", size: "lg" })}>Notes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </section>
  );
}
