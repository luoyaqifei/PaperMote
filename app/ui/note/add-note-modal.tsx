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
import { SubmissionResult, useForm, useInputControl } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState, useFormStatus } from "react-dom";
import { AddNoteSchema } from "@/app/lib/schema";
import Editor from "./editor";
import { useState } from "react";
import { useToast } from "@/app/lib/hooks";

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
  const [lastResult, action] = useFormState(addNote, undefined);
  const [form, fields] = useForm({
    lastResult: lastResult as SubmissionResult<string[]> | null,
    onValidate({ formData }) {
      const result = parseWithZod(formData, { schema: AddNoteSchema });
      console.log(result);
      return result;
    },
    shouldValidate: "onBlur",
    shouldRevalidate: "onSubmit",
  });
  const content = useInputControl(fields.content);


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
          <ModalHeader className="flex flex-col gap-1">New Note</ModalHeader>
          <ModalBody>
            <Input type="hidden" name="book_id" value={bookId} />
            <Input
              label="Title"
              placeholder="Enter note title"
              key={fields.title.key}
              name={fields.title.name}
              id={fields.title.id}
              classNames={{
                input: "bg-white",
                inputWrapper: "bg-white border border-gray-300 hover:border-teal-500 focus-within:border-teal-500",
                label: "text-teal-600"
              }}
            />
            <Input
              type="hidden"
              name="content"
              value={content.value}
              onChange={(e) => content.change(e.target.value)}
              key={fields.content.key}
            />
            <Editor
              content={fields.content.value || ""}
              onUpdate={(c) => {
                content.change(c);
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button color="primary" type="submit" className="bg-teal-600 hover:bg-teal-700" onClick={handleClick}>
              Add Note
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
