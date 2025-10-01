"use client";
import React, { ChangeEvent, useContext, useState } from "react";
import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
  InputSize,
  InputVariant,
} from "@/types/enums";
import Input from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";
import { AiOutlineMenu } from "react-icons/ai";
import toast from "react-hot-toast";
import { ProductType } from "@/types/interface";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import Button from "@/components/ui/button";

type FormValues = {
  name: string;
  category: string;
  brand: string;
  description: string;
  calories: string;
  stock: string;
  price: string;
  deliveryFee: string;
  size?: string;
  color?: string;
};

const AddProduct = () => {
  const { setProducts, setIsSidebarOpen } = useContext(AuthContext)!;
  const router = useRouter();
  const [images, setImages] = useState<File[]>([]);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      category: "",
      brand: "",
      description: "",
      calories: "",
      stock: "",
      price: "",
      deliveryFee: "",
      size: "",
      color: "",
    },
  });

  const addProduct = (product: ProductType) => {
    setProducts((prev) => [
      ...prev,
      {
        ...product,
        id: Number(prev.length + 1),
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

  const onSubmit = (data: FormValues) => {
    try {
      if (images?.length === 0) {
        toast.error("At least one image is required!");
        return;
      }

      addProduct({
        id: Date.now(),
        name: data.name,
        images: images.map((image) => URL.createObjectURL(image)),
        category: { id: 1, name: data.category },
        brand: { id: 1, name: data.brand },
        description: data.description,
        calories: Number(data.calories),
        stock: Number(data.stock),
        price: Number(data.price),
        size: data.size ?? "",
        color: data.color ?? "",
        featuredImage: images.length > 0 ? URL.createObjectURL(images[0]) : "",
        goalId: 1,
        brandId: 1,
        categoryId: 1,
        specs: "",
        updatedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      });

      reset();
      setImages([]);
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Product Images
          </label>

          <div className="flex gap-2 flex-wrap">
            <label className="w-36 h-32 text-4xl flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg p-2 cursor-pointer select-none hover:border-teal-500 transition text-gray-400">
              +
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

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
          </div>
          <p className="mt-2 text-xs max-w-[600px] text-gray-400">
            Product image must in a JPG or PNG format, clear with a plain
            background, and the full product must be visible. Avoid colorful or
            busy backgrounds to keep the product visible in the app
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="text"
                  id="name"
                  label="Name"
                  value={field.value}
                  setValue={field.onChange}
                  variant={InputVariant.OUTLINE}
                  size={InputSize.SMALL}
                  placeholder="Enter product name"
                  required
                />
              )}
            />
          </div>
          <div className="flex-1">
            <Controller
              name="category"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="text"
                  id="category"
                  label="Category"
                  value={field.value}
                  setValue={field.onChange}
                  variant={InputVariant.OUTLINE}
                  size={InputSize.SMALL}
                  placeholder="Enter product category"
                  required
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Controller
              name="brand"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="text"
                  id="brand"
                  label="Brand"
                  value={field.value}
                  setValue={field.onChange}
                  variant={InputVariant.OUTLINE}
                  size={InputSize.SMALL}
                  placeholder="Enter brand name"
                  required
                />
              )}
            />
          </div>
          <div className="flex-1">
            <Controller
              name="price"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="number"
                  id="price"
                  label="Price"
                  value={field.value}
                  setValue={field.onChange}
                  variant={InputVariant.OUTLINE}
                  size={InputSize.SMALL}
                  placeholder="Enter product price"
                  required
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Controller
              name="calories"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="number"
                  id="requiredCalories"
                  label="Required Calories"
                  value={field.value}
                  setValue={field.onChange}
                  variant={InputVariant.OUTLINE}
                  size={InputSize.SMALL}
                  placeholder="Enter required calories"
                  required
                />
              )}
            />
          </div>
          <div className="flex-1">
            <Controller
              name="stock"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="number"
                  id="stock"
                  label="Stock"
                  value={field.value}
                  setValue={field.onChange}
                  variant={InputVariant.OUTLINE}
                  size={InputSize.SMALL}
                  placeholder="Enter stock quantity"
                  required
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Controller
              name="size"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="size"
                  label="Sizes (Optional)"
                  value={field.value ?? ""}
                  setValue={field.onChange}
                  variant={InputVariant.OUTLINE}
                  size={InputSize.SMALL}
                  placeholder="e.g. Small, Medium, Large"
                />
              )}
            />
          </div>
          <div className="flex-1">
            <Controller
              name="color"
              control={control}
              render={({ field }) => (
                <Input
                  type="text"
                  id="color"
                  label="Colors (Optional)"
                  value={field.value ?? ""}
                  setValue={field.onChange}
                  variant={InputVariant.OUTLINE}
                  size={InputSize.SMALL}
                  placeholder="e.g. Red, Blue, Black"
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <Controller
              name="description"
              control={control}
              rules={{ required: true, minLength: 8 }}
              render={({ field }) => (
                <textarea
                  id="description"
                  minLength={8}
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter description"
                  rows={3}
                  className="bg-transparent w-full p-2 rounded-lg text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              )}
            />
          </div>
          <div className="flex-1 mt-1">
            <Controller
              name="deliveryFee"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="number"
                  id="deliveryFee"
                  label="Delivery Fee (In Euro)"
                  value={field.value}
                  setValue={field.onChange}
                  variant={InputVariant.OUTLINE}
                  size={InputSize.SMALL}
                  placeholder="Enter delivery fee"
                  required
                />
              )}
            />
          </div>
        </div>

        <div>
          <Button
            label="Add Product"
            type={ButtonType.SUBMIT}
            variant={ButtonVariant.THEME}
            size={ButtonSize.MEDIUM}
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
