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
import Editor from "@/app/ui/components/editor";
import { useToast } from "@/app/lib/hooks";
import { button } from "@/app/ui/style-variants/button";
import { modal } from "@/app/ui/style-variants/modal";
import { input } from "@/app/ui/style-variants/input";
import { useEffect } from "react";

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
  const { pending } = useFormStatus();
  const [form, fields] = useForm({
    lastResult: lastResult as SubmissionResult<string[]> | null,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AddNoteSchema });
    },
    shouldValidate: "onSubmit",
    shouldRevalidate: "onBlur",
  });

  const contentInputControl = useInputControl(fields.content);
  useEffect(() => {
    if (lastResult?.status === "success") {
      onClose();
    }
  }, [lastResult]);

  useToast(lastResult as SubmissionResult<string[]> | null);
  return (
    <Modal
      isDismissable={false}
      isOpen={isOpen}
      onClose={() => {
        form.reset();
        contentInputControl.change("");
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
          <ModalHeader>New Note</ModalHeader>
          <ModalBody>
            <Input type="hidden" name="book_id" value={bookId} />
            <Input
              label="Title"
              placeholder="Enter note title"
              key={fields.title.key}
              name={fields.title.name}
              id={fields.title.id}
              isInvalid={!!fields.title.errors}
              errorMessage={fields.title.errors}
              classNames={{
                input: input().input(),
                label: input().label(),
                inputWrapper: input().inputWrapper(),
              }}
            />
            <Input
              label="Book Location"
              type="number"
              placeholder="Enter book location"
              key={fields.book_location.key}
              name={fields.book_location.name}
              id={fields.book_location.id}
              isInvalid={!!fields.book_location.errors}
              errorMessage={fields.book_location.errors}
            />
            <Editor
              name={fields.content.name}
              content={fields.content.value || ""}
              isInvalid={!!fields.content.errors}
              errors={fields.content.errors}
              onUpdate={(c) => {
                contentInputControl.change(c);
              }}
              onBlur={() => {
                if (fields.content.value === "") {
                  contentInputControl.change("");
                }
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
            <Button
              type="submit"
              disabled={pending}
              className={button({ color: "primary" })}
            >
              Add Note
            </Button>
          </ModalFooter>
        </ModalContent>
      </form>
    </Modal>
  );
}
