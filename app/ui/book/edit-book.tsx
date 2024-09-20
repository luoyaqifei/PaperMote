"use client";
import { Book } from "@/app/lib/definitions";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import { PencilIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useFormState } from "react-dom";
import { updateBook } from "@/app/lib/actions";
import { useToast } from "@/app/lib/hooks";
import { UpdateBookSchema } from "@/app/lib/schema";
import { useForm, SubmissionResult } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";

export default function EditBook({ book }: { book: Book }) {
  const [isOpen, setIsOpen] = useState(false);
  const [lastResult, action] = useFormState(updateBook, undefined);
  const [form, fields] = useForm({
    lastResult: lastResult as SubmissionResult<string[]> | null,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: UpdateBookSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onSubmit",
    defaultValue: {
      id: book?.id,
      title: book?.title,
      author: book?.author,
      description: book?.description,
    },
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.currentTarget.form?.requestSubmit();
    setIsOpen(false);
  };

  useToast(lastResult as SubmissionResult<string[]> | null);

  return (
    <>
      <Button
        className="mt-4 ml-auto bg-blue-600 hover:bg-blue-700 text-white"
        color="primary"
        variant="solid"
        size="sm"
        startContent={<PencilIcon className="size-4 text-white" />}
        onClick={() => setIsOpen(true)}
        type="button"
      >
        Edit Manually
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Book"
        classNames={{
          base: "bg-white",
          backdrop: "bg-black/50",
          header: "bg-teal-600 text-white",
          body: "bg-white",
          footer: "bg-teal-600 text-white",
        }}
      >
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">Edit Book</ModalHeader>
            <ModalBody>
              <div className="space-y-4">
                <Input
                  label="Title"
                  key={fields.title.key}
                  name={fields.title.name}
                  defaultValue={book.title}
                  placeholder="Enter book title"
                  isInvalid={!!fields.title.errors}
                  errorMessage={fields.title.errors?.join(", ")}
                />
                <Input
                  label="Author"
                  key={fields.author.key}
                  name={fields.author.name}
                  defaultValue={book.author}
                  placeholder="Enter author name"
                  isInvalid={!!fields.author.errors}
                  errorMessage={fields.author.errors?.join(", ")}
                />
                <Textarea
                  label="Description"
                  key={fields.description.key}
                  name={fields.description.name}
                  defaultValue={book.description}
                  placeholder="Enter book description"
                  isInvalid={!!fields.description.errors}
                  errorMessage={fields.description.errors?.join(", ")}
                />
                <Input
                  type="hidden"
                  key={fields.id.key}
                  name={fields.id.name}
                  value={book.id}
                />
                <Button
                  type="submit"
                  color="primary"
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  onClick={handleClick}
                >
                  Update Book Info
                </Button>
              </div>
            </ModalBody>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
