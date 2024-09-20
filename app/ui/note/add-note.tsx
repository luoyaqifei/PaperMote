"use client";
import AddNoteModal from "@/app/ui/note/add-note-modal";
import { Button, useDisclosure } from "@nextui-org/react";

export default function AddNote({bookId}: {bookId: string}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <div>
      <Button color="primary" onClick={onOpen} className="bg-teal-600 hover:bg-teal-700">
        + New Note
      </Button>
      <AddNoteModal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        onClose={onClose} 
        bookId={bookId}
      />
    </div>
  );
}