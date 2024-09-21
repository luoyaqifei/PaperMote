"use client";
import { Book } from "@/app/lib/definitions";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
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
import { button } from "../style-variants/button";
import { modal } from "../style-variants/modal";
import { input } from "../style-variants/input";

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
        startContent={<PencilIcon className="size-4" />}
        onClick={() => setIsOpen(true)}
        type="button"
        className={button({ color: "secondary", size: "sm" })}
      >
        Edit Manually
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Edit Book"
        classNames={{
          base: modal().base(),
          backdrop: modal().backdrop(),
          header: modal().header(),
          body: modal().body(),
          footer: modal().footer(),
        }}
      >
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <ModalContent>
            <ModalHeader>Edit Book</ModalHeader>
            <ModalBody>
              <Input
                classNames={{
                  input: input().input(),
                  label: input().label(),
                  inputWrapper: input().inputWrapper()
                }}
                label="Title"
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={book.title}
                placeholder="Enter book title"
                isInvalid={!!fields.title.errors}
                errorMessage={fields.title.errors?.join(", ")}
              />
              <Input
                classNames={{
                  input: input().input(),
                  label: input().label(),
                  inputWrapper: input().inputWrapper()
                }}
                label="Author"
                key={fields.author.key}
                name={fields.author.name}
                defaultValue={book.author}
                placeholder="Enter author name"
                isInvalid={!!fields.author.errors}
                errorMessage={fields.author.errors?.join(", ")}
              />
              <Textarea
                classNames={{
                  input: input().input(),
                  label: input().label(),
                  inputWrapper: input().inputWrapper()
                }}
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
            </ModalBody>
            <ModalFooter>
                <Button
                    type="button"
                    className={button({ color: "neutral", flat: true })}
                    onClick={() => setIsOpen(false)}
                >
                    Cancel
                </Button>
              <Button
                type="submit"
                className={button({ color: "primary" })}
                onClick={handleClick}
              >
                Update Book Info
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
