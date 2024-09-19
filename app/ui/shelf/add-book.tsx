"use client";
import AddBookModal from "@/app/ui/shelf/add-book-modal";
import {
    Button,
    useDisclosure,
  } from "@nextui-org/react";
export default function AddBook() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    return (<>
    <Button color="primary" onClick={onOpen} type="button">
    + New Book
  </Button>
  <AddBookModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
  </>)
}