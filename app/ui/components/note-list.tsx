"use client";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { colorPalette } from "@/app/ui/style-variants/variables";
import { headline } from "@/app/ui/style-variants/headline";
import { Note } from "@/app/lib/definitions";

export default function NoteList({ notes }: { notes: Note[] }) {
  return (
    <div className="space-y-4">
      <h3 className={headline({ color: "primary", size: "lg" })}>Notes</h3>
      <Table>
        <TableHeader className={`capitalize text-default-600 ${colorPalette.primary}`}>
          <TableColumn className={`${colorPalette.primary}`}>Title</TableColumn>
          <TableColumn className={`${colorPalette.primary}`}>Content</TableColumn>
          <TableColumn className={`${colorPalette.primary}`}>Book Location</TableColumn>
        </TableHeader>
        <TableBody>
          {notes.map((note) => (
            <TableRow key={note.id}>
              <TableCell>{note.title}</TableCell>
              <TableCell>
                <div dangerouslySetInnerHTML={{ __html: note.content }} />
              </TableCell>
              <TableCell>
                {note.book_location ? (
                  <Chip
                    variant="dot"
                  >
                    Page {note.book_location}
                  </Chip>
                ) : null}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
