"use client";
import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ButtonSize,
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

const EditProduct = () => {
  const { products, setProducts, setIsSidebarOpen } = useContext(AuthContext)!;
  const { id } = useParams();
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
  const [images, setImages] = useState<(File | string)[]>([]);
  const [deliveryFee, setDeliveryFee] = useState("");

  const product = products.find((product) => product.id === id);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setCategory(product.category);
      setBrand(product.brand);
      setDescription(product.description);
      setRequiredCalories(product.requiredCalories.toString());
      setStock(product.stock.toString());
      setPrice(product.price.toString());
      setSize(product.size || []);
      setColor(product.color || []);
      setImages(product.images);
      setDeliveryFee(product.deliveryFee?.toString() ?? "");
    }
  }, [product]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setImages((prev) => [...prev, ...filesArray]);
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, ind) => ind !== index));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      if (images?.length === 0) {
        toast.error("At least one image is required!");
        return;
      }

      const updatedProduct: ProductType = {
        ...(product as ProductType),
        name,
        images: images.map((image) =>
          typeof image === "string" ? image : URL.createObjectURL(image)
        ),
        category,
        brand,
        description,
        requiredCalories: Number(requiredCalories),
        stock: Number(stock),
        price: Number(price),
        deliveryFee: Number(deliveryFee),
        size,
        color,
      };

      setProducts((prev) =>
        prev.map((product) => (product.id === id ? updatedProduct : product))
      );

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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Product Images
          </label>

          <div className="flex gap-2 flex-wrap">
            <label className="w-36 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-500 rounded-lg p-2 cursor-pointer select-none hover:border-teal-500 transition text-sm text-gray-400">
              Upload
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
                  ✕
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
              label="Sizes (Optional)"
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
              label="Colors (Optional)"
              value={color.join(", ")}
              setValue={(val) => setColor(val.split(",").map((c) => c.trim()))}
              variant={InputVariant.OUTLINE}
              size={InputSize.SMALL}
              placeholder="e.g. Red, Blue, Black"
            />
          </div>
        </div>
        {/* <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <Input
              type="number"
              id="delivery fee"
              label="Delivery Fee (In Euro)"
              value={deliveryFee}
              setValue={setDeliveryFee}
              variant={InputVariant.OUTLINE}
              size={InputSize.SMALL}
              placeholder="Enter delivery fee"
            />
          </div>
          <div className="flex-1"></div>
        </div> */}

        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
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
          <div className="flex-1 mt-1">
            <Input
              type="number"
              id="delivery fee"
              label="Delivery Fee (In Euro)"
              value={deliveryFee}
              setValue={setDeliveryFee}
              variant={InputVariant.OUTLINE}
              size={InputSize.SMALL}
              placeholder="Enter delivery fee"
            />
          </div>
        </div>
        <div className="mt-2">
          <button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md font-semibold transition cursor-pointer"
          >
            Update Product
          </button>
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
