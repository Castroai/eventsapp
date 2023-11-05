"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce";
export const EditorComponent = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMC_KEY ?? ""}
      plugins="wordcount"
      onInit={(evt, editor) => (editorRef.current = editor)}
      init={{
        height: 300,
        menubar: false,
      }}
      id="description"
    />
  );
};
