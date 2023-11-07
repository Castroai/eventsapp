"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce";
export const EditorComponent = () => {
  const editorRef = useRef<TinyMCEEditor>();

  return (
    <>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINYMC_KEY ?? ""}
        plugins="wordcount"
        onInit={(evt, editor) => {
          editorRef.current = editor;
        }}
        onChange={() => {
          const element = document.getElementById("description");
          if (element && editorRef.current) {
            element.innerHTML = editorRef.current.getContent();
          }
        }}
        init={{
          height: 300,
          menubar: false,
        }}
      />
      <textarea name="description" id="description" hidden />
    </>
  );
};
