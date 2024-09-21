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
import { useFormState } from "react-dom";
import { AddNoteSchema } from "@/app/lib/schema";
import Editor from "./editor";
import { useToast } from "@/app/lib/hooks";
import { button } from "../style-variants/button";
import { modal } from "../style-variants/modal";
import { input } from "../style-variants/input";

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
      return parseWithZod(formData, { schema: AddNoteSchema });
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
        base: modal().base(),
        backdrop: modal().backdrop(),
        header: modal().header(),
        body: modal().body(),
        footer: modal().footer(),
      }}
    >
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <ModalContent>
          <ModalHeader>New Note</ModalHeader>
          <ModalBody>
            <Input
              type="hidden"
              name="book_id"
              value={bookId}
            />
            <Input
              label="Title"
              placeholder="Enter note title"
              key={fields.title.key}
              name={fields.title.name}
              id={fields.title.id}
              classNames={{
                input: input().input(),
                label: input().label(),
                inputWrapper: input().inputWrapper()
              }}
            />
            <Input
              type="hidden"
              name="content"
              defaultValue={content.value}
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
            <Button
              type="button"
              className={button({ color: "neutral", flat: true })}
              onClick={() => onClose()}
            >
              Cancel
            </Button>
            <Button type="submit" className={button({color: "primary"})} onClick={handleClick}>
              Add Note
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
