"use client";
import AddNoteModal from "@/app/ui/components/add-note-modal";
import { Button, useDisclosure } from "@nextui-org/react";
import { button } from "@/app/ui/style-variants/button";

export default function AddNote({bookId}: {bookId: string}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} className={button({color: "primary"})}>
        + New Note
      </Button>
      <AddNoteModal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange} 
        onClose={onClose} 
        bookId={bookId}
      />
    </>
  );
}