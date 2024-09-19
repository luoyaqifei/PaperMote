"use client";
import AddBookModal from "@/app/ui/shelf/add-book-modal";
import { Button, useDisclosure } from "@nextui-org/react";

export default function AddBook() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button color="primary" onPress={onOpen} className="bg-teal-600 hover:bg-teal-700">
        + New Book
      </Button>
      <AddBookModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
    </>
  )
}