"use client";
import { addNote } from "@/app/lib/actions";
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
import { AddNoteSchema } from "@/app/lib/schema";
import Editor from "../note/editor";

export default function AddNoteModal({
  isOpen,
  onOpenChange,
  onClose,
  bookId,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  bookId: string;
}) {
  const [form, fields] = useForm({
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AddNoteSchema });
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
  });

  const [state, formAction] = useFormState(addNote, null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append('book_id', bookId);
    formAction(formData);
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onOpenChange} 
      placement="top-center"
      classNames={{
        base: "bg-teal-50",
        header: "bg-teal-600 text-white",
        body: "py-6",
        footer: "bg-teal-100"
      }}
    >
      <form onSubmit={handleSubmit}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">New Note</ModalHeader>
          <ModalBody>
            <Input
              label="Title"
              placeholder="Enter note title"
              {...fields.title}
              classNames={{
                input: "bg-white",
                label: "text-teal-600"
              }}
            />
            <Editor
              content=""
              onUpdate={(content) => {
                const contentInput = document.createElement('input');
                contentInput.type = 'hidden';
                contentInput.name = 'content';
                contentInput.value = content;
                fields.content.value = content;
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" type="submit" className="bg-teal-600 hover:bg-teal-700">
              Add Note
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
