"use client";
import AddNoteModal from "@/app/ui/note/add-note-modal";
import { Button, useDisclosure } from "@nextui-org/react";
import { button } from "../style-variants/button";

export default function AddNote({bookId}: {bookId: string}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <div>
      <Button onClick={onOpen} className={button({color: "primary"})}>
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