"use client";
import AddBookModal from "@/app/ui/components/add-book-modal";
import { Button, useDisclosure } from "@nextui-org/react";
import { button } from "@/app/ui/style-variants/button";
import BookCard from "@/app/ui/components/book-card";

export default function AddBook() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <BookCard backgroundImage={""}>
        <Button
          onClick={onOpen}
          className={button({ color: "secondary", size: "lg" })}
        >
          + New Book
        </Button>
      </BookCard>
      <AddBookModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onClose}
      />
    </>
  );
}
