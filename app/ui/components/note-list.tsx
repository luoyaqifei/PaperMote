"use client";
import { headline } from "@/app/ui/style-variants/headline";
import { Note } from "@/app/lib/definitions";
import NoteCard from "@/app/ui/components/note-card";

export default function NoteList({ notes }: { notes: Note[] }) {
  if (!notes || notes.length === 0) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h3 className={headline({ color: "primary", size: "lg" })}>Notes</h3>
      <div className="flex flex-wrap gap-4">
        {notes.map((note) => (
          <div
            key={note.id}
            className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.667rem)]"
          >
            <NoteCard note={note} />
          </div>
        ))}
      </div>
    </section>
  );
}
