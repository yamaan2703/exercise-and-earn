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
import { usePostBrandMutation } from "@/redux/slices/brandSlice";

interface BrandModalProps {
  label: string;
  setAddBrandModal: Dispatch<SetStateAction<boolean>>;
}

const BrandModal = ({ label, setAddBrandModal }: BrandModalProps) => {
  const [name, setName] = useState("");
  const [createBrand, { isLoading }] = usePostBrandMutation();

  const handleAddBrand = async () => {
    if (!name.trim()) {
      toast.error("Brand name is required!");
      return;
    }

    try {
      const response = await createBrand({ name: name.trim() }).unwrap();

      if (response.success) {
        toast.success("Brand added successfully!");
        setAddBrandModal(false);
        setName("");
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Something went wrong");
      console.error("Error adding brand:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]">
      <div className="bg-[#06211e] text-white w-[90%] max-w-sm rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center gap-2 mb-3">
          <h2 className="text-lg font-semibold">{label}</h2>
          <button
            onClick={() => setAddBrandModal(false)}
            className="text-white hover:text-gray-400 cursor-pointer text-xl leading-none"
          >
            X
          </button>
        </div>
        <div className="mt-5 space-y-3">
          <Input
            id="name"
            type="text"
            label="Name"
            placeholder="Enter brand name..."
            value={name}
            setValue={setName}
            variant={InputVariant.DEFAULT}
            size={InputSize.SMALL}
            required
          />
          <Button
            type={ButtonType.BUTTON}
            externalStyles="mt-3"
            label={isLoading ? "Adding..." : "Add Brand"}
            onClick={handleAddBrand}
            variant={ButtonVariant.THEME}
            size={ButtonSize.SMALL}
          />
        </div>
      </div>
    </div>
  );
};

export default BrandModal;
