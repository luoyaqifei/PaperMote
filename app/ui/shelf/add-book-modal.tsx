"use client";
import { addBook } from "@/app/lib/actions";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "@nextui-org/react";
import { SubmissionResult, useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState, useFormStatus } from "react-dom";
import { AddBookSchema } from "@/app/lib/schema";

export default function AddBookModal({
  isOpen,
  onOpenChange,
  onClose,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
}) {
  const [lastResult, action] = useFormState(addBook, undefined);
  const { pending } = useFormStatus();
  const [form, fields] = useForm({
    lastResult: lastResult as SubmissionResult<string[]> | null,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AddBookSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.form?.requestSubmit();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">New Book</ModalHeader>
          <ModalBody>
            <Input
              key={fields.title.key}
              name={fields.title.name}
              defaultValue={fields.title.initialValue as string}
              autoFocus
              label="Title"
              placeholder="Title of the book"
              variant="bordered"
              isInvalid={!!fields.title.errors}
              errorMessage={fields.title.errors}
            />
            <Input
              key={fields.author.key}
              name={fields.author.name}
              defaultValue={fields.author.initialValue as string}
              label="Author"
              placeholder="Author of the book"
              variant="bordered"
              isInvalid={!!fields.author.errors}
              errorMessage={fields.author.errors}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              color="danger"
              variant="flat"
              onPress={onClose}
              type="button"
            >
              Close
            </Button>
            <Button
              color="primary"
              type="submit"
              isDisabled={pending}
              onEnded={onClose}
              onClick={handleClick}
            >
              Add Book
            </Button>
            <div>{form.errors}</div>
            {lastResult && "message" in lastResult && (
              <div className="text-red-500 mt-2">{lastResult.message}</div>
            )}
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
