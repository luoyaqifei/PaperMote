"use client";
import { Button } from "@nextui-org/react";
import { button } from "@/app/ui/style-variants/button";

export default function AddNote({ bookId }: { bookId: string }) {
  return (
    <>
      <Button
        as="a"
        href={`/dashboard/books/${bookId}/add-note`}
        className={button({ color: "primary" })}
      >
        + New Note
      </Button>
    </>
  );
}
