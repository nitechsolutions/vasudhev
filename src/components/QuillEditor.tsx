"use client";

import {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import "quill/dist/quill.snow.css";

/* ===============================
   Types
================================ */

export interface QuillEditorHandle {
  getHTML: () => string;
  getDelta: () => any;
  setDelta: (d: any) => void;
}

interface QuillEditorProps {
  initialValue?: string | any;
  modules?: Record<string, any>;
  placeholder?: string;
}

/* ===============================
   Component
================================ */

const QuillEditor = forwardRef<
  QuillEditorHandle,
  QuillEditorProps
>(function QuillEditor(
  { initialValue = "", modules = {}, placeholder = "" },
  ref
) {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillRef = useRef<any>(null);

  useEffect(() => {
    let mounted = true;

    async function init() {
      if (!editorRef.current || quillRef.current) return;

      const Quill = (await import("quill")).default;
      if (!mounted) return;

      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
        modules,
        placeholder,
      });

      if (initialValue) {
        quillRef.current.root.innerHTML =
          typeof initialValue === "string"
            ? initialValue
            : "";
      }
    }

    init();
    return () => {
      mounted = false;
    };
  }, [initialValue, modules, placeholder]);

  useImperativeHandle(ref, () => ({
    getHTML: () =>
      quillRef.current?.root?.innerHTML || "",
    getDelta: () =>
      quillRef.current?.getContents?.(),
    setDelta: (d) =>
      quillRef.current?.setContents?.(d),
  }));

  return (
    <div
      ref={editorRef}
      className="min-h-[180px] bg-white"
    />
  );
});

export default QuillEditor;
