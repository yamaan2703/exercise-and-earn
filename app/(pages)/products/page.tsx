"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import TableProductsComponent from "@/components/ui/table/table-products";
import { AuthContext } from "@/context/AuthContext";
import { Routes } from "@/routes/Routes";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaPlus, FaSearch } from "react-icons/fa";

const Products = () => {
  const router = useRouter();
  const { toggleSidebar } = useContext(AuthContext)!;
  const [searchProducts, setSearchProducts] = useState("");

  return (
    <div className="space-y-2 p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-700 after:rounded-full after:mt-1">
          Products
        </h1>
        <div
          onClick={() => toggleSidebar()}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>

      <div className="flex justify-between gap-2">
        <div className="max-w-[400px] w-full">
          <Input
            placeholder="Search products by name and category..."
            type="text"
            id="search"
            value={searchProducts}
            setValue={setSearchProducts}
            variant="outline"
            size="sm"
            iconLeft={<FaSearch />}
          />
        </div>
        <Button
          variant="theme"
          size="sm"
          label="Add Product"
          icon={FaPlus}
          onClick={() => router.push(Routes.ADD_PRODUCT)}
        />
      </div>

      <div className="">
        <TableProductsComponent searchProducts={searchProducts} />
      </div>
    </div>
  );
};

export default Products;
