"use client";
import prisma from "@/app/lib/db";
import { useState } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";

const TypeAhead = () => {
  const [options, setOptions] = useState<{ label: string; value: number }[]>(
    []
  );
  const handleSearch = async (query: string) => {
    const results = await prisma.event.findMany({
      where: {
        // Your search criteria based on the query
        // For example: { name: { contains: query, mode: 'insensitive' } }
        description: {
          search: "cat",
        },
        AND: {
          eventName: {
            search: "",
          },
        },
      },
    });

    const formattedOptions = results.map((item) => ({
      label: item.eventName, // Assuming 'name' is a field in your model
      value: item.id, // Assuming 'id' is the unique identifier in your model
    }));

    setOptions(formattedOptions);
  };
  return (
    <div>
      <Typeahead
        id="typeahead-example"
        labelKey="label"
        options={options}
        placeholder="Search..."
        onChange={(q) => {
          console.log(q);
        }}
      />
    </div>
  );
};
