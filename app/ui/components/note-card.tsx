import { Note } from "@/app/lib/definitions";
import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  useDisclosure,
} from "@nextui-org/react";
import { colorPalette } from "@/app/ui/style-variants/variables";
import { TrashIcon } from "@heroicons/react/24/outline";
import DeleteModal from "@/app/ui/components/delete-modal";
import { deleteNote } from "@/app/lib/actions";
import { setToast } from "@/app/lib/client-utils";
import { SubmissionResult } from "@conform-to/react";
import { alegreyaSans } from "@/app/ui/style-variants/fonts";

export default function NoteCard({ note }: { note: Note }) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <Card key={note.id} className="w-full">
      <CardHeader
        className={`font-bold ${colorPalette.primary} flex justify-between`}
      >
        {note.title}
        <TrashIcon
          className="w-4 h-4 align-right hover:cursor-pointer hover:scale-110"
          onClick={() => {
            onOpen();
          }}
        />
        <DeleteModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
          title={"Delete Note"}
          action={async () => {
            const result = await deleteNote(note.id, note.book_id);
            if (result.status === "error") {
              setToast(result as SubmissionResult<string[]>);
            } else {
              onClose();
            }
          }}
        >
          <p className="text-lg font-semibold">
            Are you sure you want to delete this note?
          </p>
        </DeleteModal>
      </CardHeader>
      <CardBody
        as="a"
        className="flex flex-col justify-between"
        href={`/dashboard/books/${note.book_id}/edit-note/${note.id}`}
      >
        {note.book_location && (
          <Chip
            variant="dot"
            size="sm"
            color="primary"
            className={`justify-end ${alegreyaSans.className}`}
          >
            Page{" "}
            <span className="font-bold text-lg">{note.book_location}</span>
          </Chip>
        )}
        <div
          dangerouslySetInnerHTML={{ __html: note.content }}
          className="mb-2"
        />
      </CardBody>
    </Card>
  );
}
