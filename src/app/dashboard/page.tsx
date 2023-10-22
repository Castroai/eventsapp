"use client";

import { ReactNode, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { NewEventForm } from "../components/NewEventForm";
import { Button, Modal } from "flowbite-react";

export default function Dashboard({ children }: { children: ReactNode }) {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  return (
    <DashboardLayout>
      <div>
        <Button onClick={() => props.setOpenModal("default")}>
          Create New Event
        </Button>

        <Modal
          show={props.openModal === "default"}
          onClose={() => props.setOpenModal(undefined)}
        >
          <Modal.Header>Create New Event</Modal.Header>
          <Modal.Body>
            <NewEventForm />
          </Modal.Body>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
