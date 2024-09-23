"use client";
import { addNote, updateNote } from "@/app/lib/actions";
import { Button, Input } from "@nextui-org/react";
import { SubmissionResult, useForm, useInputControl } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { useFormState, useFormStatus } from "react-dom";
import { AddNoteSchema } from "@/app/lib/schema";
import Editor from "@/app/ui/components/editor";
import { useToast } from "@/app/lib/hooks";
import { button } from "@/app/ui/style-variants/button";
import { input } from "@/app/ui/style-variants/input";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Note } from "@/app/lib/definitions";

export default function AddEditNoteForm({
  bookId,
  note,
  isEdit,
}: {
  bookId: string;
  note?: Note;
  isEdit?: boolean;
}) {
  const router = useRouter();
  const [lastResult, action] = useFormState(
    isEdit ? updateNote : addNote,
    undefined,
  );
  const defaultValues = note
    ? {
        ...note,
        book_id: bookId,
      }
    : undefined;
  const { pending } = useFormStatus();
  const [form, fields] = useForm({
    lastResult: lastResult as SubmissionResult<string[]> | null,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: AddNoteSchema });
    },
    defaultValue: defaultValues,
    shouldValidate: "onSubmit",
    shouldRevalidate: "onBlur",
  });

  const contentInputControl = useInputControl(fields.content);
  useEffect(() => {
    if (lastResult?.status === "success") {
      router.push(`/dashboard/books/${bookId}`);
    }
  }, [lastResult, router, bookId]);

  useToast(lastResult as SubmissionResult<string[]> | null);

  return (
    <form
      id={form.id}
      onSubmit={form.onSubmit}
      action={action}
      noValidate
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold mb-4">
        {isEdit ? "Edit Note" : "New Note"}
      </h2>
      <Input type="hidden" name="book_id" value={bookId} />
      <Input type="hidden" name="id" value={note?.id} />
      <Input
        label="Title"
        placeholder="Enter note title"
        key={fields.title.key}
        name={fields.title.name}
        id={fields.title.id}
        isInvalid={!!fields.title.errors}
        errorMessage={fields.title.errors}
        defaultValue={fields.title.value}
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
        defaultValue={fields.book_location.value}
        isInvalid={!!fields.book_location.errors}
        errorMessage={fields.book_location.errors}
        classNames={{
          input: input().input(),
          label: input().label(),
          inputWrapper: input().inputWrapper(),
        }}
      />
      <Editor
        name={fields.content.name}
        content={fields.content.value || ""}
        errors={fields.content.errors}
        onUpdate={(c) => {
          contentInputControl.change(c);
        }}
      />
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          className={button({ color: "neutral", flat: true })}
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={pending}
          className={button({ color: "primary" })}
        >
          {isEdit ? "Update Note" : "Add Note"}
        </Button>
      </div>
    </form>
  );
}
