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
import Image from "next/image";
import Button from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import {
  useGetProductbyIdQuery,
  useUpdateProductMutation,
} from "@/redux/slices/productSlice";
import Loader from "@/components/ui/loader";
import { getCookie } from "@/lib/cookies";

type FormValues = {
  name: string;
  categoryId: string;
  brandId: string;
  goalId: string;
  description: string;
  calories: string;
  stock: string;
  price: string;
  specs: string;
  size?: string;
};

const EditProduct = () => {
  const { setIsSidebarOpen, setStockHistory } = useContext(AuthContext)!;
  const { id } = useParams();
  const router = useRouter();
  const [updateProduct] = useUpdateProductMutation();
  const { data: getData, isLoading } = useGetProductbyIdQuery(Number(id));
  const [images, setImages] = useState<(File | string)[]>([]);
  const product = getData?.product;
  const token = getCookie("token");

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      name: "",
      categoryId: "",
      brandId: "",
      goalId: "",
      description: "",
      calories: "",
      stock: "",
      price: "",
      size: "",
      specs: "",
    },
  });

  useEffect(() => {
    console.log(product);
    if (product) {
      reset({
        name: product.name,
        categoryId: product.categoryId,
        brandId: product.brandId,
        goalId: product.goalId,
        description: product.description ?? "",
        calories: product.calories,
        stock: product.stock,
        price: product.price,
        size: product.size ?? "",
        specs: product.specs,
      });
      setImages(product.images);
    }
  }, [product, reset]);

  const uploadImage = async (file: File) => {
    try {
      const presignedResponse = await fetch(
        "https://exercise-and-earn-backend-production.up.railway.app/cloudinary/presignedurl",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ fileName: [file.name] }),
        }
      );

      if (!presignedResponse.ok) throw new Error("Failed to get presigned URL");

      const presignedData = await presignedResponse.json();
      const { url, fields } = presignedData[0];

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      formData.append("file", file);

      const uploadResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error("File upload failed");

      return `${url}/${fields.key}`;
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Image upload failed");
      throw error;
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, ind) => ind !== index));
  };

  const onSubmit = async (data: FormValues) => {
    try {
      if (images.length === 0) {
        toast.error("At least one image is required!");
        return;
      }

      const uploadedUrls: string[] = [];
      for (const img of images) {
        if (typeof img === "string") {
          uploadedUrls.push(img);
        } else {
          const uploadedUrl = await uploadImage(img);
          uploadedUrls.push(uploadedUrl);
        }
      }

      const oldStock = product?.stock ?? 0;
      const newStock = Number(data.stock);

      const updatedBody = {
        name: data.name,
        brandId: Number(data.brandId),
        categoryId: Number(data.categoryId),
        goalId: Number(data.goalId),
        stock: newStock,
        price: Number(data.price),
        size: data.size ?? "",
        specs: data.specs,
        description: data.description,
        featuredImage: uploadedUrls[0],
        images: uploadedUrls,
      };

      await updateProduct({ id: Number(id), ...updatedBody }).unwrap();
      console.log(updatedBody);

      if (newStock > oldStock) {
        const addedStock = newStock - oldStock;
        setStockHistory((prev) => [
          ...prev,
          {
            productId: product?.id ?? 0,
            productName: data.name,
            addedStock,
            createdAt: new Date().toLocaleString(),
          },
        ]);
      }

      router.push(Routes.PRODUCTS_DETAIL(Number(id)));
      toast.success("Product updated successfully!");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      console.log("error", error);
      toast.error(err?.data?.message || "something went wrong");
    }
  };

  if (isLoading)
    return (
      <p className="flex justify-center items-center min-h-[100vh]">
        <Loader size="xl" />
      </p>
    );
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

            {images?.map((image, index) => (
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
                  unoptimized
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
              name="categoryId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="number"
                  id="categoryId"
                  label="Category Id"
                  value={field.value}
                  setValue={field.onChange}
                  variant={InputVariant.OUTLINE}
                  size={InputSize.SMALL}
                  placeholder="Enter category id"
                  required
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Controller
              name="brandId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="number"
                  id="brandId"
                  label="Brand Id"
                  value={field.value}
                  setValue={field.onChange}
                  variant={InputVariant.OUTLINE}
                  size={InputSize.SMALL}
                  placeholder="Enter brand id"
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
              name="goalId"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="number"
                  id="goalId"
                  label="Goal Id"
                  value={field.value}
                  setValue={field.onChange}
                  variant={InputVariant.OUTLINE}
                  size={InputSize.SMALL}
                  placeholder="Enter goal Id"
                  required
                />
              )}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Controller
              name="specs"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  type="text"
                  id="specifications"
                  label="Specs"
                  value={field.value}
                  setValue={field.onChange}
                  variant={InputVariant.OUTLINE}
                  size={InputSize.SMALL}
                  placeholder="Enter product specifications"
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
