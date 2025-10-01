"use client";
import { useContext, useEffect, useState } from "react";
import "react-quill-new/dist/quill.snow.css";
import Button from "@/components/ui/button";
import { AiOutlineMenu } from "react-icons/ai";
import { AuthContext } from "@/context/AuthContext";
import { formats, modules, ReactQuill } from "@/Data/Data";
import { ButtonSize, ButtonType, ButtonVariant } from "@/types/enums";
import {
  useGetTermsQuery,
  usePostTermsMutation,
} from "@/redux/slices/termsAndConditionSlice";
import toast from "react-hot-toast";
import Loader from "@/components/ui/loader";

export default function TermsAndConditions() {
  const [content, setContent] = useState("");
  const { setIsSidebarOpen } = useContext(AuthContext)!;
  const [postTerms, { isLoading }] = usePostTermsMutation();
  const { data, isLoading: isFetching } = useGetTermsQuery("terms");

  useEffect(() => {
    if (data?.content) {
      setContent(data.content);
    }
  }, [data]);

  const handleUpdate = async () => {
    try {
      await postTerms({ content }).unwrap();
      toast.success("Updated Terms!");
    } catch (error) {
      console.log("error", error);
      toast.error("error in updating terms");
    }
  };

  return (
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
          Terms & Conditions
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
          label={isLoading ? "Updating" : "Update"}
          variant={ButtonVariant.THEME}
          size={ButtonSize.SMALL}
        />
      </div>

      {isFetching ? (
        <p className="flex justify-center items-center min-h-[100vh]">
          <Loader size="xl" />
        </p>
      ) : (
        <div className="bg-[#0d332e] p-2 space-y-2 rounded-xl shadow-lg">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            placeholder="Write your Terms and Conditions here..."
            modules={modules}
            formats={formats}
            className="custom-quill"
          />
        </div>
      )}
    </div>
  );
}
