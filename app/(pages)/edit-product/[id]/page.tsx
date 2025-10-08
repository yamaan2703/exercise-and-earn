"use client";
import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
import { useGetGoalsQuery } from "@/redux/slices/goalSlice";
import { useGetCategoryQuery } from "@/redux/slices/categorySlice";
import { useGetBrandsQuery } from "@/redux/slices/brandSlice";
import { BrandItem, CategoryItem, GoalItem } from "@/types/interface";

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
  color?: string;
};

const EditProduct = () => {
  const { setIsSidebarOpen, setStockHistory } = useContext(AuthContext)!;
  const { id } = useParams();
  const router = useRouter();
  const token = getCookie("token");
  const [images, setImages] = useState<(File | string)[]>([]);
  const [updateProduct] = useUpdateProductMutation();
  const { data: getData, isLoading } = useGetProductbyIdQuery(Number(id));
  const { data: brandData } = useGetBrandsQuery(null);
  const { data: categoryData } = useGetCategoryQuery(null);
  const { data: goalData } = useGetGoalsQuery(null);

  const product = useMemo(() => getData?.product ?? [], [getData]);
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
      description: "",
      calories: "",
      stock: "",
      price: "",
      size: "",
      specs: "",
      color: "",
    },
  });

  useEffect(() => {
    if (!product?.id) return;

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
      color: product.color ?? "",
    });
    setImages(product.images);
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

      const oldStock = product?.stock;
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
        color: data.color ?? "",
        description: data.description,
        featuredImage: uploadedUrls[0],
        images: uploadedUrls,
      };

      await updateProduct({ id: Number(id), ...updatedBody }).unwrap();
      console.log(updatedBody);

      if (newStock !== oldStock) {
        const stockChanged = newStock - oldStock;
        setStockHistory((prev) => [
          ...prev,
          {
            productId: product?.id,
            stockChanged,
            createdAt: new Date().toLocaleString(),
          },
        ]);
      }

      router.push(Routes.PRODUCTS_DETAIL(Number(id)));
      toast.success("Product updated successfully!");
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
        err?.data?.message?.[0] || err?.data?.error || "something went wrong"
      );
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

      <form
        onSubmit={handleSubmit(onSubmit, (err) => console.log(err))}
        className="space-y-6"
      >
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
        </div>

        <div className="flex flex-col sm:flex-row gap-6">
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

          <div className="flex-1">
            <Controller
              name="price"
              control={control}
              rules={{ required: "Please enter price" }}
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
                  label="Color"
                  value={field.value ?? ""}
                  setValue={field.onChange}
                  variant={InputVariant.OUTLINE}
                  size={InputSize.SMALL}
                  placeholder="Enter product color"
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
              rules={{ required: "Please enter some description." }}
              render={({ field }) => (
                <textarea
                  id="description"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter description"
                  rows={3}
                  className="bg-transparent w-full p-2 rounded-lg text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
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
