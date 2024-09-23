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
import { button } from "@/app/ui/style-variants/button";
import { modal } from "@/app/ui/style-variants/modal";
import { input } from "@/app/ui/style-variants/input";
import { useEffect } from "react";
export default function AddBookModal({
  isOpen,
  onOpenChange,
  onClose,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
}) {
  const [lastResult, action] = useFormState(addBook, undefined);
  const { pending } = useFormStatus();
  const [form, fields] = useForm({
    lastResult: lastResult as SubmissionResult<string[]> | null,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AddBookSchema });
    },
    shouldValidate: "onSubmit",
    shouldRevalidate: "onBlur",
  });

  useEffect(() => {
    if (lastResult?.status === "success") {
      onClose();
    }
  }, [lastResult, onClose]);

  useToast(lastResult as SubmissionResult<string[]> | null);

  return (
    <Modal
      isDismissable={false}
      isOpen={isOpen}
      onClose={() => {
        form.reset();
      }}
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
              errorMessage={fields.title.errors}
              isInvalid={!!fields.title.errors}
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
              isInvalid={!!fields.author.errors}
              errorMessage={fields.author.errors}
              classNames={{
                input: input().input(),
                inputWrapper: input().inputWrapper(),
                label: input().label(),
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button
              className={button({ color: "neutral", flat: true })}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={pending}
              className={button({ color: "primary" })}
            >
              Add Book
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
