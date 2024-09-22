import AddEditNoteForm from "@/app/ui/components/add-edit-note-form";

export default function AddNotePage({params}: {params: {id: string}}) {
  return <AddEditNoteForm bookId={params.id} />
}
