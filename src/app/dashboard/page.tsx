"use client";

import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { NewEventForm } from "../components/NewEventForm";
import { Button, Modal } from "flowbite-react";
import { Wrapper } from "@googlemaps/react-wrapper";

export default function Dashboard() {
  const [openModal, setOpenModal] = useState<string | undefined>();
  const props = { openModal, setOpenModal };
  return (
    <DashboardLayout>
      <Wrapper
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        libraries={["places"]}
      >
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
      </Wrapper>
    </DashboardLayout>
  );
}
