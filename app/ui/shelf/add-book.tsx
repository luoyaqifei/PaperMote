"use client";
import AddBookModal from "@/app/ui/shelf/add-book-modal";
import { Button, useDisclosure } from "@nextui-org/react";
import { button } from "../style-variants/button";

export default function AddBook() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen} className={button({color: "primary"})}>
        + New Book
      </Button>
      <AddBookModal isOpen={isOpen} onOpenChange={onOpenChange} onClose={onClose} />
    </>
  )
}