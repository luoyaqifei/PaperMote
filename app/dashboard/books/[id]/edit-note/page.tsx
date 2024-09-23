import { redirect } from "next/navigation";

export default function EditNotePage({ params }: { params: { id: string } }) {
  const { id } = params;
  redirect(`/dashboard/books/${id}`);
}
