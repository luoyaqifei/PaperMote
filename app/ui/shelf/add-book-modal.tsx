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
import { button } from "../style-variants/button";
import { modal } from "../style-variants/modal";
import { input } from "../style-variants/input";

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
        base: modal().base(),
        backdrop: modal().backdrop(),
        header: modal().header(),
        body: modal().body(),
        footer: modal().footer(),
      }}
    >
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <ModalContent>
          <ModalHeader>New Book</ModalHeader>
          <ModalBody>
            <Input
              label="Title"
              placeholder="Enter book title"
              autoFocus
              defaultValue={fields.title.value}
              key={fields.title.key}
              name={fields.title.name}
              classNames={{
                input: input().input(),
                label: input().label(),
                inputWrapper: input().inputWrapper(),
              }}
            />
            <Input
              label="Author"
              placeholder="Enter book author"
              defaultValue={fields.author.value}
              key={fields.author.key}
              name={fields.author.name}
              classNames={{
                input: input().input(),
                inputWrapper: input().inputWrapper(),
                label: input().label(),
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              className={button({color: "neutral"})}
              onClick={onClose}
            >
              Close
            </Button>
            <Button disabled={pending} type="submit" className={button({color: "primary"})} onClick={handleClick}>
              Add Book
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
