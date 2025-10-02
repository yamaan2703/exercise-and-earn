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
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import Button from "@/components/ui/button";
import { useAddProductsMutation } from "@/redux/slices/productSlice";

type FormValues = {
  name: string;
  category: string;
  brand: string;
  description: string;
  calories: string;
  stock: string;
  price: string;
  size?: string;
  color?: string;
};

const AddProduct = () => {
  const { setIsSidebarOpen } = useContext(AuthContext)!;
  const router = useRouter();
  const [addProductApi] = useAddProductsMutation();
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
      size: "",
      color: "",
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...filesArray]);
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      if (images?.length === 0) {
        toast.error("At least one image is required!");
        return;
      }

      const dummyUrls = [
        "https://randomuser.me/api/portraits/men/2.jpg",
        "https://randomuser.me/api/portraits/men/3.jpg",
      ];

      const body = {
        name: data.name,
        brandId: 1,
        categoryId: 1,
        stock: Number(data.stock),
        price: Number(data.price),
        size: data.size ?? "",
        specs: "Lightweight, Breathable",
        goalId: 1,
        featuredImage: dummyUrls[0],
        images: dummyUrls,
      };

      await addProductApi(body).unwrap();
      console.log("added", body);

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

      <form
        onSubmit={handleSubmit(onSubmit, (err) => {
          console.log(err, "error on form submit");
        })}
        className="space-y-6"
      >
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
                {(() => {
                  let src = "/images/bottle.png";
                  try {
                    src = URL.createObjectURL(file);
                  } catch {
                    src = "/images/bottle.png";
                  }
                  return (
                    <Image
                      src={src}
                      alt={`image-${index + 1}`}
                      width={100}
                      height={100}
                      className="w-full h-full object-contain rounded-md shadow-md"
                      unoptimized
                    />
                  );
                })()}
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
