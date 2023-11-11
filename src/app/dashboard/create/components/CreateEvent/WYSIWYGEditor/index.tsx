"use client";
import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from "tinymce";

export const EditorComponent = ({ value }: { value?: string | null }) => {
  const editorRef = useRef<TinyMCEEditor | null>(null); // Use null type for initial ref value

  return (
    <>
      <textarea
        name="description"
        id="description"
        style={{ display: "none" }}
        value={value || ""}
      />
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMC_KEY || ""} // Use logical OR operator for default value
        initialValue={value ? value : "Description here"} // Set initial editor content to empty string
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        onEditorChange={(content, editor) => {
          const element = document.getElementById(
            "description"
          ) as HTMLTextAreaElement | null;
          if (element && editorRef.current) {
            element.value = content; // Use value property to update textarea content
          }
        }}
        init={{
          height: 300,
          menubar: false,
        }}
      />
    </>
  );
};
