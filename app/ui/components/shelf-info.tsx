"use client";

import { Book } from "@/app/lib/definitions";
import { Divider, Chip } from "@nextui-org/react";
import { fontSize } from "@/app/ui/style-variants/variables";
import Statistics from "@/app/ui/components/statistics";

export default function ShelfInfo({ books }: { books: Book[] }) {
  return (
    <Statistics>
      <h2 className={`${fontSize.xl} font-semibold mb-2`}>
        Your Bookshelf Stats
      </h2>
      <Divider className="my-2" />
      <section className={`${fontSize.md} mb-2`}>
        You have{" "}
        <Chip color="primary" variant="flat" size="lg">
          {books.length ?? 0}
        </Chip>{" "}
        {books.length === 1 ? "book" : "books"} in your shelf.
      </section>
      {books.length > 0 && (
        <section className={`${fontSize.md}`}>
          The last book you edited is{" "}
          <Chip color="primary" variant="flat" size="lg">
            {books[0].title}
          </Chip>
        </section>
      )}
    </Statistics>
  );
}
