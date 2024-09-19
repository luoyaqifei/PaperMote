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
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
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
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AddBookSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [state, formAction] = useFormState(addBook, null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formAction(formData);
    onClose();
  };

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
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">New Book</ModalHeader>
          <ModalBody>
            <Input
              label="Title"
              placeholder="Enter book title"
              {...fields.title}
              classNames={{
                input: "bg-white",
                inputWrapper: "bg-white border border-gray-300 hover:border-teal-500 focus-within:border-teal-500",
                label: "text-teal-600"
              }}
            />
            <Input
              label="Author"
              placeholder="Enter book author"
              {...fields.author}
              classNames={{
                input: "bg-white",
                inputWrapper: "bg-white border border-gray-300 hover:border-teal-500 focus-within:border-teal-500",
                label: "text-teal-600"
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" type="submit" className="bg-teal-600 hover:bg-teal-700">
              Add Book
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
