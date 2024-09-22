import { fetchNote } from "@/app/lib/data";
import notFound from "@/app/not-found";
import AddEditNoteForm from "@/app/ui/components/add-edit-note-form";

export default async function EditNotePage({params}: {params: {id: string, "note-id": string}}) {
  const note = await fetchNote(params["note-id"]);
  if (!note) {
    return notFound();
  }
  return <AddEditNoteForm bookId={params.id} note={note} isEdit />
}
