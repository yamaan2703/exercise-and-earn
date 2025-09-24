"use client";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { InputSize, InputVariant, StatusProduct } from "@/types/enums";
import Input from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";
import { AiOutlineMenu } from "react-icons/ai";
import toast from "react-hot-toast";
import { ProductType } from "@/types/interface";
import Image from "next/image";

const AddProduct = () => {
  const { setProducts, setIsSidebarOpen } = useContext(AuthContext)!;
  const router = useRouter();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [requiredCalories, setRequiredCalories] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState<string[]>([]);
  const [color, setColor] = useState<string[]>([]);
  const [status] = useState(StatusProduct.ACTIVE);
  const [images, setImages] = useState<File[]>([]);

  const addProduct = (product: ProductType) => {
    setProducts((prev) => [
      ...prev,
      {
        ...product,
        id: String(prev.length + 1),
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...filesArray]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      if (images?.length === 0) {
        toast.error("At least one image is required!");
        return;
      }

      addProduct({
        id: "",
        name,
        images: images.map((image) => URL.createObjectURL(image)),
        category,
        brand,
        description,
        requiredCalories: Number(requiredCalories),
        stock: Number(stock),
        price: Number(price),
        size,
        color,
        status,
        createdAt: "",
      });
      router.push(Routes.PRODUCTS);
      toast.success("Product added successfully!");
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
          Add Product
        </h1>
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Product Images
          </label>

          <div className="flex gap-2 flex-wrap">
            {images.map((file, index) => (
              <div
                key={index}
                className="w-36 h-32 flex items-center justify-center border-2 border-dashed border-gray-500 rounded-lg p-2 relative"
              >
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`image-${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-contain rounded-md shadow-md"
                />
              </div>
            ))}

            <label className="w-36 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg p-2 cursor-pointer hover:border-teal-500 transition text-sm text-gray-400">
              Upload
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Product image must be JPG or PNG, clear with a plain background, and
            the full product must be visible.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Input
              type="text"
              id="name"
              label="Name"
              value={name}
              setValue={setName}
              variant={InputVariant.OUTLINE}
              size={InputSize.SMALL}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="flex-1">
            <Input
              type="text"
              id="category"
              label="Category"
              value={category}
              setValue={setCategory}
              variant={InputVariant.OUTLINE}
              size={InputSize.SMALL}
              placeholder="Enter product category"
              required
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Input
              type="text"
              id="brand"
              label="Brand"
              value={brand}
              setValue={setBrand}
              variant={InputVariant.OUTLINE}
              size={InputSize.SMALL}
              placeholder="Enter brand name"
              required
            />
          </div>

          <div className="flex-1">
            <Input
              type="number"
              id="price"
              label="Price"
              value={price}
              setValue={setPrice}
              variant={InputVariant.OUTLINE}
              size={InputSize.SMALL}
              placeholder="Enter product price"
              required
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Input
              type="number"
              id="requiredCalories"
              label="Required Calories"
              value={requiredCalories}
              setValue={setRequiredCalories}
              variant={InputVariant.OUTLINE}
              size={InputSize.SMALL}
              placeholder="Enter required calories"
              required
            />
          </div>

          <div className="flex-1">
            <Input
              type="number"
              id="stock"
              label="Stock"
              value={stock}
              setValue={setStock}
              variant={InputVariant.OUTLINE}
              size={InputSize.SMALL}
              placeholder="Enter stock quantity"
              required
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
              variant={InputVariant.OUTLINE}
              size={InputSize.SMALL}
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
              variant={InputVariant.OUTLINE}
              size={InputSize.SMALL}
              placeholder="e.g. Red, Blue, Black"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            minLength={8}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows={3}
            className="bg-transparent w-full p-2 rounded-lg text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
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
