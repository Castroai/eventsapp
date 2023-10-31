"use client";
// @ts-ignore
import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Button, Card } from "flowbite-react";
import { WithSearch } from "../context/SearchContext";
import { Table } from "flowbite-react";
import Link from "next/link";

export default function Dashboard() {
  const { results, fetchAllEvents } = WithSearch();
  useEffect(() => {
    fetchAllEvents({
      user: "me",
    });
  }, []);
  return (
    <DashboardLayout>
      <div className="p-4 flex flex-col gap-4">
        <Card>
          <div className="flex flex-col gap-2">
            <h1 className="text-md">Start Selling Tickets today</h1>
            <div>
              <Link href={"/dashboard/create"}>
                <Button>Create New Event</Button>
              </Link>
            </div>
          </div>
        </Card>

        {/*  */}
        <Card>
          <Table striped>
            <Table.Head>
              <Table.HeadCell>Event Name</Table.HeadCell>
              <Table.HeadCell>Date</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
              <Table.HeadCell>Price</Table.HeadCell>
              <Table.HeadCell>
                <span className="sr-only">Edit</span>
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {results &&
                results.map((re, index) => {
                  return (
                    <Table.Row
                      key={index}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {re.eventName}
                      </Table.Cell>
                      <Table.Cell>
                        {new Date(re.date).toDateString()}
                      </Table.Cell>
                      {/* TODO: Fix re.numberOfLikes types */}
                      <Table.Cell>3</Table.Cell>
                      <Table.Cell>$29.99</Table.Cell>
                      <Table.Cell>
                        <a
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                          href="/tables"
                        >
                          <p>Edit</p>
                        </a>
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
            </Table.Body>
          </Table>
        </Card>
      </div>
    </DashboardLayout>
  );
}
