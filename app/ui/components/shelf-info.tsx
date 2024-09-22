"use client";

import { Book } from "@/app/lib/definitions";
import { Card, CardBody, Divider, Chip } from "@nextui-org/react";
import { colorPalette, fontSize } from "@/app/ui/style-variants/variables";

export default function ShelfInfo({ books }: { books: Book[] }) {
  return (
    <Card className={`${colorPalette.primary} mt-8 shadow-md`}>
      <CardBody>
        {books.length > 0 ? (
          <>
            <h2 className={`${fontSize.xl} font-semibold mb-2`}>Your Bookshelf Stats</h2>
            <Divider className="my-2" />
            <div className={`${fontSize.md} mb-2`}>
              You have <Chip color="primary" variant="flat" size="lg">{books.length}</Chip> books in your shelf.
            </div>
            <div className={`${fontSize.md}`}>
              The last book you edited is <Chip color="primary" variant="flat" size="lg">{books[0].title}</Chip>
            </div>
          </>
        ) : (
          <p className={`${fontSize.md}`}>You have no books in your shelf.</p>
        )}
      </CardBody>
    </Card>
  );
}