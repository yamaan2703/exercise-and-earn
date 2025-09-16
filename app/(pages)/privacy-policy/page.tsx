"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import Button from "@/components/ui/button";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ color: [] }, { background: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "color",
  "background",
  "list",
  "indent",
  "align",
  "link",
  "image",
  "video",
];

export default function PrivacyPolicy() {
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    const savedPolicy = localStorage.getItem("privacyPolicy");
    if (savedPolicy) {
      setEditorContent(savedPolicy);
    }
  }, []);

  const handleUpdate = () => {
    localStorage.setItem("privacyPolicy", editorContent);
    console.log("Updated Policy:", editorContent);
  };

  return (
    <div className="min-h-screen">
      <div className="mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-700 after:rounded-full after:mt-1">
          Privacy Policy
        </h1>
      </div>
      <div className="flex justify-end mb-2 mr-2">
        <Button
          onClick={handleUpdate}
          label="Update"
          variant="theme"
          size="md"
        />
      </div>

      <div className="bg-[#0d332e] p-2 space-y-2 rounded-xl shadow-lg">
        <ReactQuill
          theme="snow"
          value={editorContent}
          onChange={setEditorContent}
          placeholder="Write your Privacy Policy here..."
          modules={modules}
          formats={formats}
          className="custom-quill"
        />
      </div>
    </div>
  );
}
