"use client";
import { useContext, useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import Button from "@/components/ui/button";
import { AiOutlineMenu } from "react-icons/ai";
import { AuthContext } from "@/context/AuthContext";
import { formats, modules, ReactQuill } from "@/Data/Data";
import { ButtonSize, ButtonType, ButtonVariant } from "@/types/enums";

export default function PrivacyPolicy() {
  const [editorContent, setEditorContent] = useState("");
  const { setIsSidebarOpen } = useContext(AuthContext)!;

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
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
          Privacy Policy
        </h1>
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>
      <div className="flex justify-end mb-2 mr-2">
        <Button
          type={ButtonType.BUTTON}
          onClick={handleUpdate}
          label="Update"
          variant={ButtonVariant.THEME}
          size={ButtonSize.SMALL}
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
