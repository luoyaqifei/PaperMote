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
import { useToast } from "@/app/lib/hooks";

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
  const {pending} = useFormStatus();
  const [form, fields] = useForm({
    lastResult: lastResult as SubmissionResult<string[]> | null,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AddBookSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onSubmit",
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.currentTarget.form?.requestSubmit();
    onClose();
  };

  useToast(lastResult as SubmissionResult<string[]> | null);

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange} 
      placement="top-center"
      classNames={{
        base: "bg-white",
        header: "bg-teal-600 text-white",
        body: "py-6",
        footer: "bg-white"
      }}
    >
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">New Book</ModalHeader>
          <ModalBody>
            <Input
              label="Title"
              placeholder="Enter book title"
              autoFocus
              defaultValue={fields.title.value}
              key={fields.title.key}
              name={fields.title.name}
              variant="bordered"
              classNames={{
                input: "bg-white",
                inputWrapper: "bg-white border focus-within:border-teal-500",
                label: "text-teal-600"
              }}
            />
            <Input
              label="Author"
              placeholder="Enter book author"
              defaultValue={fields.author.value}
              key={fields.author.key}
              name={fields.author.name}
              variant="bordered"
              classNames={{
                input: "bg-white",
                inputWrapper: "bg-white border focus-within:border-teal-500",
                label: "text-teal-600"
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button disabled={pending} color="primary" type="submit" className="bg-teal-600 hover:bg-teal-700" onClick={handleClick}>
              Add Book
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
