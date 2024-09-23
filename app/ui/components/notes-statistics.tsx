import { Note } from "@/app/lib/definitions";
import { fontSize } from "@/app/ui/style-variants/variables";
import { Chip, Progress } from "@nextui-org/react";
import Statistics from "@/app/ui/components/statistics";
import { getNoteWithLastLocation } from "@/app/lib/data";
import { Book } from "@/app/lib/definitions";
import { alegreyaSans } from "@/app/ui/style-variants/fonts";

export default async function NotesStatistics({
  book,
  notes,
  bookId,
}: {
  book: Book;
  notes: Note[];
  bookId: string;
}) {
  const lastNote = await getNoteWithLastLocation(bookId);

  return (
    <Statistics>
      <section className={`${fontSize.md} mb-2 ${alegreyaSans.className}`}>
        You have{" "}
        <Chip color="primary" variant="flat" size="lg">
          {notes.length}
        </Chip>{" "}
        {notes.length === 1 ? "note" : "notes"} here.
      </section>
      {lastNote?.book_location && book.page_count ? (
        <section
          className={`${fontSize.md} mb-2 flex justify-start items-end gap-2 ${alegreyaSans.className}`}
        >
          <span>Your progress of reading this book:</span>
          <Progress
            aria-label="Downloading..."
            size="md"
            value={lastNote?.book_location / book.page_count * 100}
            color="primary"
            showValueLabel={true}
            className="max-w-md"
          />
        </section>
      ) : null}
    </Statistics>
  );
}
