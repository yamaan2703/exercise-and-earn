"use client";
import Input from "../input";
import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
  InputSize,
  InputVariant,
} from "@/types/enums";
import Button from "../button";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useState } from "react";
import { usePostCategoryMutation } from "@/redux/slices/categorySlice";

interface CategoryModalProps {
  label: string;
  setAddCategoryModal: Dispatch<SetStateAction<boolean>>;
}

const CategoryModal = ({ label, setAddCategoryModal }: CategoryModalProps) => {
  const [name, setName] = useState("");
  const [postCategory, { isLoading }] = usePostCategoryMutation();

  const handleAddCategory = async () => {
    if (!name.trim()) {
      toast.error("Category name is required!");
      return;
    }

    try {
      const response = await postCategory({ name: name.trim() }).unwrap();

      if (response.success) {
        toast.success("Category added successfully!");
        setAddCategoryModal(false);
        setName("");
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Something went wrong");
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] backdrop-blur-sm">
      <div className="bg-[#06211e] text-white w-[90%] max-w-sm rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center gap-2 mb-3">
          <h2 className="text-lg font-semibold">{label}</h2>
          <button
            onClick={() => setAddCategoryModal(false)}
            className="text-white hover:text-gray-400 cursor-pointer text-xl leading-none"
          >
            X
          </button>
        </div>
        <div className="mt-5 space-y-3">
          <Input
            id="name"
            type="text"
            label="Category"
            placeholder="Enter category name..."
            value={name}
            setValue={setName}
            variant={InputVariant.DEFAULT}
            size={InputSize.SMALL}
            required
          />
          <div className="flex justify-end mt-4">
            <Button
              type={ButtonType.BUTTON}
              label={isLoading ? "Adding..." : "Add Category"}
              onClick={handleAddCategory}
              variant={ButtonVariant.THEME}
              size={ButtonSize.SMALL}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
