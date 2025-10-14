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
import { getCookie } from "@/lib/cookies";
import { useGetBrandsQuery } from "@/redux/slices/brandSlice";
import { useGetCategoryQuery } from "@/redux/slices/categorySlice";
import { useGetGoalsQuery } from "@/redux/slices/goalSlice";
import { BrandItem, CategoryItem, GoalItem } from "@/types/interface";
import { FaPlus } from "react-icons/fa";
import { ColorPicker } from "antd";

type FormValues = {
  name: string;
  categoryId: string;
  brandId: string;
  goalId: string;
  calories: string;
  stock: string;
  price: string;
  specs: string;
  sizes?: string;
  colors?: string;
  description: string;
};

const AddProduct = () => {
  const { setIsSidebarOpen } = useContext(AuthContext)!;
  const router = useRouter();
  const token = getCookie("token");
  const [images, setImages] = useState<File[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [currentColor, setCurrentColor] = useState<string>("#000000");
  const [currentSize, setCurrentSize] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const [addProductApi] = useAddProductsMutation();
  const { data: brandData } = useGetBrandsQuery(null);
  const { data: categoryData } = useGetCategoryQuery(null);
  const { data: goalData } = useGetGoalsQuery(null);

  const brands = brandData?.brands ?? [];
  const categories = categoryData?.categories ?? [];
  const goals = goalData?.goals ?? [];

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      categoryId: "",
      brandId: "",
      goalId: "",
      calories: "",
      stock: "",
      price: "",
      specs: "",
      sizes: "",
      colors: "",
      description: "",
    },
  });

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...filesArray]);
    }
  };

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

      const fileUrl = `${url}/${fields.key}`;
      return fileUrl;
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Image upload failed");
      throw error;
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      if (images?.length === 0) {
        toast.error("At least one image is required!");
        return;
      }
      const uploadedUrls: string[] = [];
      for (const file of images) {
        const uploadedUrl = await uploadImage(file);
        uploadedUrls.push(uploadedUrl);
      }

      const body = {
        name: data.name,
        brandId: Number(data.brandId),
        categoryId: Number(data.categoryId),
        goalId: Number(data.goalId),
        stock: Number(data.stock),
        price: Number(data.price),
        specs: data.specs,
        featuredImage: uploadedUrls[0],
        images: uploadedUrls,
        sizes: data.sizes ? data.sizes.split(",").map((s) => s.trim()) : [],
        colors: data.colors
          ? data.colors.split(",").map((c) => c.trim().replace("#", ""))
          : [],
        description: data.description,
      };

      await addProductApi(body).unwrap();
      console.log("product added", body);

      reset();
      setImages([]);
      router.push(Routes.PRODUCTS);
      toast.success("Product added successfully!");
    } catch (error: unknown) {
      const err = error as {
        data?: {
          success: boolean;
          error?: string;
          message?: string | string[];
        };
      };
      console.log("error", error);
      toast.error(
        err?.data?.message?.[0] || err?.data?.error || "Something went wrong"
      );
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
                <Image
                  src={URL.createObjectURL(file)}
                  alt={`image-${index + 1}`}
                  width={100}
                  height={100}
                  className="w-full h-full object-contain rounded-md shadow-md"
                  unoptimized
                />
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs max-w-[600px] text-gray-400">
            The first image will be the Featured Image. Product image must in a
            JPG or PNG format, clear with a plain background, and the full
            product must be visible. Avoid colorful or busy backgrounds to keep
            the product visible in the app
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Controller
              name="name"
              control={control}
              rules={{ required: "Please enter product name" }}
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
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
          <div className="flex-1">
            <Controller
              name="brandId"
              control={control}
              rules={{ required: "Please select a brand." }}
              render={({ field }) => (
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Brand
                  </label>
                  <select
                    {...field}
                    className="w-full bg-[#0b2d29] text-white border border-teal-500/30 rounded-lg p-2 pr-2"
                  >
                    <option value="">Select a brand</option>
                    {brands.map((brand: BrandItem) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                  {errors.brandId && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.brandId.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Controller
              name="categoryId"
              control={control}
              rules={{ required: "Please select a category." }}
              render={({ field }) => (
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    {...field}
                    className="w-full bg-[#0b2d29] text-white border border-teal-500/30 rounded-lg p-2"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category: CategoryItem) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {errors.categoryId && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.categoryId.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="flex-1">
            <Controller
              name="price"
              control={control}
              rules={{ required: "Please enter product price" }}
              render={({ field }) => (
                <Input
                  type="number"
                  id="price"
                  label="Price (In Euro)"
                  value={field.value}
                  setValue={field.onChange}
                  variant={InputVariant.OUTLINE}
                  size={InputSize.SMALL}
                  placeholder="Enter product price"
                />
              )}
            />
            {errors.price && (
              <p className="text-red-500 text-xs mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Controller
              name="stock"
              control={control}
              rules={{ required: "Please enter stock quantity" }}
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
                />
              )}
            />
            {errors.stock && (
              <p className="text-red-500 text-xs mt-1">
                {errors.stock.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <Controller
              name="goalId"
              control={control}
              rules={{ required: "Please select a goal." }}
              render={({ field }) => (
                <div>
                  <label className="block text-sm text-gray-300 mb-2">
                    Goal
                  </label>
                  <select
                    {...field}
                    className="w-full bg-[#0b2d29] text-white border border-teal-500/30 rounded-lg p-2"
                  >
                    <option value="">Select a goal</option>
                    {goals.map((goal: GoalItem) => (
                      <option key={goal.id} value={goal.id}>
                        {goal.calories} cal
                      </option>
                    ))}
                  </select>
                  {errors.goalId && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.goalId.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Controller
              name="sizes"
              control={control}
              render={({ field }) => {
                const handleAddSize = () => {
                  const trimmed = currentSize.trim();
                  if (trimmed && !selectedSizes.includes(trimmed)) {
                    const updated = [...selectedSizes, trimmed];
                    setSelectedSizes(updated);
                    field.onChange(updated.join(","));
                    setCurrentSize("");
                  }
                };

                const removeSize = (size: string) => {
                  const updated = selectedSizes.filter((s) => s !== size);
                  setSelectedSizes(updated);
                  field.onChange(updated.join(","));
                };

                return (
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Sizes (Optional)
                    </label>

                    <div className="flex items-center gap-1">
                      <div className="flex-grow">
                        <Input
                          type="text"
                          id="sizes"
                          value={currentSize}
                          setValue={setCurrentSize}
                          variant={InputVariant.OUTLINE}
                          size={InputSize.SMALL}
                          placeholder="Add Sizes"
                        />
                      </div>
                      <div className="w-[30px]">
                        <Button
                          type={ButtonType.BUTTON}
                          variant={ButtonVariant.THEME}
                          size={ButtonSize.CUSTOM}
                          icon={FaPlus}
                          onClick={handleAddSize}
                        />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedSizes.map((size, index) => (
                        <div
                          key={index}
                          className="relative bg-teal-700/40 text-white text-sm px-3 py-1 rounded-lg border border-teal-500/50 cursor-pointer group"
                        >
                          {size}
                          <button
                            type="button"
                            onClick={() => removeSize(size)}
                            className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 hidden group-hover:block"
                          >
                            x
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }}
            />
          </div>

          <div className="flex-1">
            <Controller
              name="specs"
              control={control}
              rules={{ required: "Please enter product specifications." }}
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
                />
              )}
            />
            {errors.specs && (
              <p className="text-red-500 text-xs mt-1">
                {errors.specs.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Controller
              name="description"
              control={control}
              rules={{ required: "Please enter some description." }}
              render={({ field }) => (
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm text-gray-300 mb-2"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    {...field}
                    placeholder="Enter product description"
                    className="w-full bg-transparent text-white border border-gray-400 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-teal-500 transition duration-200 rounded-lg p-2 h-32 resize-none"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>
          <div className="flex-1">
            <Controller
              name="colors"
              control={control}
              render={({ field }) => {
                const handleAddColor = () => {
                  if (!selectedColors.includes(currentColor)) {
                    const updated = [...selectedColors, currentColor];
                    setSelectedColors(updated);
                    field.onChange(updated.join(","));
                  }
                };

                const removeColor = (color: string) => {
                  const updated = selectedColors.filter((c) => c !== color);
                  setSelectedColors(updated);
                  field.onChange(updated.join(","));
                };

                return (
                  <div>
                    <label className="block text-sm text-gray-300 mb-2">
                      Product Colors (Optional)
                    </label>

                    <div className="flex items-center gap-3 mb-3">
                      <ColorPicker
                        value={currentColor}
                        onChange={(color) =>
                          setCurrentColor(color.toHexString())
                        }
                        disabledAlpha
                      />
                      <Button
                        type={ButtonType.BUTTON}
                        variant={ButtonVariant.THEME}
                        size={ButtonSize.EXTRASMALL}
                        onClick={handleAddColor}
                        icon={FaPlus}
                      />
                    </div>

                    <Input
                      type="text"
                      id="colors"
                      value={field.value ?? ""}
                      setValue={(val) => {
                        field.onChange(val);
                        const updated = val
                          .split(",")
                          .map((c) => c.trim())
                          .filter((c) => c !== "");
                        setSelectedColors(updated);
                      }}
                      variant={InputVariant.OUTLINE}
                      size={InputSize.SMALL}
                      placeholder="Select colors"
                    />

                    <div className="flex flex-wrap gap-2 mt-3">
                      {selectedColors.map((color, index) => (
                        <div
                          key={index}
                          className="relative w-8 h-8 rounded-full border border-gray-500 cursor-pointer group"
                          style={{ backgroundColor: color }}
                        >
                          <button
                            type="button"
                            onClick={() => removeColor(color)}
                            className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 hidden group-hover:block"
                          >
                            x
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              }}
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
