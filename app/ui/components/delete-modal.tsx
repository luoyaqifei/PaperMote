"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { headline } from "@/app/ui/style-variants/headline";
import { button } from "@/app/ui/style-variants/button";
import { modal } from "@/app/ui/style-variants/modal";

export default function DeleteModal({
  isOpen,
  onOpenChange,
  onClose,
  title,
  children,
  action,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  action: () => void;
}) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={onClose}
      classNames={{
        base: modal().base(),
        backdrop: modal().backdrop(),
        header: modal().header(),
        body: modal().body(),
        footer: modal().footer(),
      }}
    >
      <ModalContent>
        <ModalHeader>
          <h3 className={headline({ color: "primary", size: "lg" })}>
            {title}
          </h3>
        </ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button
            className={button({ color: "neutral", flat: true })}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button className={button({ color: "danger" })} onClick={action}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
