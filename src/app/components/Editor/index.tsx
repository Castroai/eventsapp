"use client";
import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";
import { Editor as TinyMCEEditor } from "tinymce";
export const EditorComponent = () => {
  const editorRef = useRef<TinyMCEEditor | null>(null);

  return (
    <Editor
      apiKey="37cs1s4f8xbvm39jkg981ytbyb2g9ykyqmuai6pud6o8iojq"
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
