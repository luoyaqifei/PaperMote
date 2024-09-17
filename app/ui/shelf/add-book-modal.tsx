"use client"
import { addBook } from "@/app/lib/actions";
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, useDisclosure } from "@nextui-org/react";
import { useFormAction } from "react-router-dom";

export default function AddBookModal() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const initialState = {message: null, errors: {}};
    // const [state, formAction] = useFormState(addBook, initialState);
    return (
      <form action={addBook}>
        <Button color="primary" onClick={onOpen}>+ New Book</Button>
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            placement="top-center"
        >
        <ModalContent>
            {(onClose: () => void) => (
                <>
            <ModalHeader className="flex flex-col gap-1">New Book</ModalHeader>
            <ModalBody>
                <Input autoFocus label="Title" placeholder="Title of the book" variant="bordered"/>
                <Input label="Author" placeholder="Author of the book" variant="bordered"/>
            </ModalBody>
            <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                Close
                </Button>
                <Button color="primary" onPress={onClose} type="submit">
                  Add Book
                </Button>
              </ModalFooter>
                </>
            )}
        </ModalContent>
        </Modal>
    </form>
    )
}