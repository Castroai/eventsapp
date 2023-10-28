"use client";

import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { NewEventForm } from "../components/NewEventForm";
import { Button, Modal } from "flowbite-react";
import { useSearchHook } from "../hooks/SearchHook";

export default function Dashboard() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  const { loading, results } = useSearchHook();
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
            <NewEventForm setOpenModal={setOpenModal} />
          </Modal.Body>
        </Modal>
      </div>
    </DashboardLayout>
  );
}
