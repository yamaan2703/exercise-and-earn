"use client";
import React, { useContext, useState } from "react";
import { StatusProduct } from "@/types/enums";
import Input from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";
import { AiOutlineMenu } from "react-icons/ai";

const AddProduct = () => {
  const { addProduct, toggleSidebar } = useContext(AuthContext)!;
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [requiredCalories, setRequiredCalories] = useState("");
  const [deliveryFee, setDeliveryFee] = useState("");
  const [size, setSize] = useState<string[]>([]);
  const [color, setColor] = useState<string[]>([]);
  const [status, setStatus] = useState(StatusProduct.ACTIVE);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      addProduct({
        id: "",
        name,
        category,
        description,
        requiredCalories: Number(requiredCalories),
        deliveryFee: Number(deliveryFee),
        size,
        color,
        status,
        createdAt: "",
      });
      router.push(Routes.PRODUCTS);
      console.log(addProduct);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-700 after:rounded-full after:mt-1">
          Add Product
        </h1>
        <div
          onClick={() => toggleSidebar()}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Input
              type="text"
              id="name"
              label="Name"
              value={name}
              setValue={setName}
              size="sm"
              variant="outline"
              placeholder="Enter product name"
            />
          </div>

          <div className="flex-1">
            <Input
              type="text"
              id="category"
              label="Category"
              value={category}
              setValue={setCategory}
              size="sm"
              variant="outline"
              placeholder="Enter product category"
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-200 font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description (optional)"
            rows={3}
            className="w-full px-4 py-2 rounded-md border border-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Input
              type="number"
              id="requiredCalories"
              label="Required Calories"
              value={requiredCalories}
              setValue={setRequiredCalories}
              size="sm"
              variant="outline"
              placeholder="Enter required calories"
            />
          </div>

          <div className="flex-1">
            <Input
              type="number"
              id="deliveryFee"
              label="Delivery Fee ($)"
              value={deliveryFee}
              setValue={setDeliveryFee}
              size="sm"
              variant="outline"
              placeholder="Enter delivery fee"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Input
              type="text"
              id="size"
              label="Sizes (insert comma)"
              value={size.join(", ")}
              setValue={(val) => setSize(val.split(",").map((s) => s.trim()))}
              size="sm"
              variant="outline"
              placeholder="e.g. Small, Medium, Large"
            />
          </div>

          <div className="flex-1">
            <Input
              type="text"
              id="color"
              label="Colors (insert comma)"
              value={color.join(", ")}
              setValue={(val) => setColor(val.split(",").map((c) => c.trim()))}
              size="sm"
              variant="outline"
              placeholder="e.g. Red, Blue, Black"
            />
          </div>
        </div>

        <div className="mt-2">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md font-semibold transition cursor-pointer"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
