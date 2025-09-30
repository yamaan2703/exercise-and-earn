"use client";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
  InputSize,
  InputVariant,
} from "@/types/enums";
import Input from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";
import { AiOutlineMenu } from "react-icons/ai";
import toast from "react-hot-toast";
import { ProductType } from "@/types/interface";
import Image from "next/image";
import Button from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";

type FormValues = {
  name: string;
  category: string;
  brand: string;
  description: string;
  requiredCalories: string;
  stock: string;
  price: string;
  size?: string;
  color?: string;
  deliveryFee: string;
};

const EditProduct = () => {
  const { products, setProducts, setIsSidebarOpen, setStockHistory } =
    useContext(AuthContext)!;
  const { id } = useParams();
  const router = useRouter();

  const product = products.find((product) => product.id === id);

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      category: "",
      brand: "",
      description: "",
      requiredCalories: "",
      stock: "",
      price: "",
      size: "",
      color: "",
      deliveryFee: "",
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        category: product.category,
        brand: product.brand,
        description: product.description,
        requiredCalories: product.requiredCalories.toString(),
        stock: product.stock.toString(),
        price: product.price.toString(),
        size: product.size?.join(", ") ?? "",
        color: product.color?.join(", ") ?? "",
        deliveryFee: product.deliveryFee?.toString() ?? "",
      });
      setImages(product.images);
    }
  }, [product, reset]);

  const [images, setImages] = useState<(File | string)[]>([]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, ind) => ind !== index));
  };

  const onSubmit = (data: FormValues) => {
    try {
      if (images.length === 0) {
        toast.error("At least one image is required!");
        return;
      }

      const oldStock = product?.stock ?? 0;
      const newStock = Number(data.stock);

      const updatedProduct: ProductType = {
        ...(product as ProductType),
        name: data.name,
        category: data.category,
        brand: data.brand,
        description: data.description,
        requiredCalories: Number(data.requiredCalories),
        stock: newStock,
        price: Number(data.price),
        deliveryFee: Number(data.deliveryFee),
        size: data.size ? data.size.split(",").map((s) => s.trim()) : [],
        color: data.color ? data.color.split(",").map((c) => c.trim()) : [],
        images: images.map((image) =>
          typeof image === "string" ? image : URL.createObjectURL(image)
        ),
      };

      setProducts((prev) =>
        prev.map((product) => (product.id === id ? updatedProduct : product))
      );

      if (newStock > oldStock) {
        const addedStock = newStock - oldStock;
        setStockHistory((prev) => [
          ...prev,
          {
            productId: product?.id as string,
            productName: data.name,
            addedStock,
            createdAt: new Date().toLocaleString(),
          },
        ]);
      }

      router.push(Routes.PRODUCTS_DETAIL(id as string));
      toast.success("Product updated successfully!");
    } catch (error) {
      console.log("error", error);
    }
  };

  return product ? (
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
          Edit Product
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
            <label className="w-36 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg p-2 cursor-pointer select-none hover:border-teal-500 transition text-4xl text-gray-400">
              +
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {images.map((image, index) => (
              <div
                key={index}
                className="w-36 h-32 border rounded-lg flex items-center justify-center relative"
              >
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-[-4px] right-[-6px] size-4 text-xs bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition"
                >
                  X
                </button>
                <Image
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt={`product-image-${index}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-contain rounded-md"
                />
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-400">
            Product image must be JPG or PNG, clear with a plain background, and
            the full product must be visible.
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
              name="requiredCalories"
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
              rules={{ required: true }}
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

        <div className="mt-2">
          <Button
            label="Update Product"
            type={ButtonType.SUBMIT}
            variant={ButtonVariant.THEME}
            size={ButtonSize.MEDIUM}
          />
        </div>
      </form>
    </div>
  ) : (
    <div className="flex justify-center mt-10">
      <div className="flex flex-col items-center">
        <div className="text-6xl mb-4">⚠️</div>
        <p className="text-red-400 text-2xl font-bold mb-2">
          Product not found
        </p>
        <Button
          type={ButtonType.BUTTON}
          label="Back"
          icon={FaArrowLeft}
          variant={ButtonVariant.THEME}
          onClick={() => router.back()}
          size={ButtonSize.MEDIUM}
        />
      </div>
    </div>
  );
};

export default EditProduct;
