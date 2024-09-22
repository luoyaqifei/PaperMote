import { Note } from "@/app/lib/definitions";
import { fontSize } from "@/app/ui/style-variants/variables";
import { Chip, Progress } from "@nextui-org/react";
import Statistics from "@/app/ui/components/statistics";
import { getNoteWithLastLocation } from "@/app/lib/data";
import { Book } from "@/app/lib/definitions";

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
      <section className={`${fontSize.md} mb-2`}>
        You have{" "}
        <Chip color="primary" variant="flat" size="lg">
          {notes.length}
        </Chip>{" "}
        {notes.length === 1 ? "note" : "notes"} here.
      </section>
      {lastNote?.book_location && book.page_count ? (
        <section
          className={`${fontSize.md} mb-2 flex justify-start items-end gap-2`}
        >
          <span>Your progress of reading this book:</span>
          <Progress
            aria-label="Downloading..."
            size="md"
            value={lastNote?.book_location}
            color="primary"
            showValueLabel={true}
            className="max-w-md"
          />
        </section>
      ) : null}
    </Statistics>
  );
}
