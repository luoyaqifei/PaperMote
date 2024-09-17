import { fetchBooks } from "@/app/lib/data";
import AddBookModal from "@/app/ui/shelf/add-book-modal";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";

export default async function ShelfPage() {
    // example: https://www.googleapis.com/books/v1/volumes?q=Exhalation&inauthor:"Ted Chiang"
    // const books = await fetchBooks();
    return (<AddBookModal/>)
}