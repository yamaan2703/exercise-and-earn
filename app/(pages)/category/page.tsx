"use client";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaPlus, FaSearch, FaEye, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { Routes } from "@/routes/Routes";
import { BrandItem, CategoryItem } from "@/types/interface";
import {
  ButtonVariant,
  ButtonSize,
  ButtonType,
  InputVariant,
  InputSize,
} from "@/types/enums";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Loader from "@/components/ui/loader";
import DynamicTable from "@/components/ui/table";
import ConfirmationModal from "@/components/ui/modal/confirmation-modal";
import { cn } from "@/lib/utils";
import type { ColumnsType } from "antd/es/table";
import {
  useDeleteCategoryMutation,
  useGetCategoryQuery,
} from "@/redux/slices/categorySlice";
import CategoryModal from "@/components/ui/modal/category-modal";

const Brands = () => {
  const { setIsSidebarOpen } = useContext(AuthContext)!;
  const router = useRouter();

  const { data, isLoading, isError } = useGetCategoryQuery(null);
  const [deleteCategory] = useDeleteCategoryMutation();

  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null
  );
  const [searchCategory, setSearchCategory] = useState("");

  const category = data?.categories ?? [];

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  const handleView = (category: CategoryItem) => {
    router.push(Routes.CATEGORYID(category.id));
  };

  const columns: ColumnsType<CategoryItem> = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: true,
      width: "15%",
    },
    {
      title: "Category Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      render: (record: CategoryItem) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleView(record)}
            title="View Category"
            className="p-1 text-white hover:text-gray-300 transition cursor-pointer"
          >
            <FaEye />
          </button>
          <button
            onClick={() => {
              setDeleteModal(true);
              setSelectedCategory(record);
            }}
            title="Delete Category"
            className={cn(
              "p-1 text-white hover:text-gray-300 transition cursor-pointer"
            )}
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <Loader size="xl" />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load category. Please try again.
      </p>
    );
  }

  return (
    <div className="space-y-2 p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
          Categories
        </h1>
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>

      <div className="mb-3 flex justify-between gap-2">
        <div className="max-w-[400px] w-full">
          <Input
            placeholder="Search category by name or ID..."
            type="text"
            id="search"
            value={searchCategory}
            setValue={setSearchCategory}
            variant={InputVariant.OUTLINE}
            size={InputSize.SMALL}
            iconLeft={<FaSearch />}
          />
        </div>
        <Button
          type={ButtonType.BUTTON}
          label="Add Category"
          onClick={() => setAddCategoryModal(true)}
          icon={FaPlus}
          variant={ButtonVariant.THEME}
          size={ButtonSize.SMALL}
        />
      </div>

      <DynamicTable<BrandItem>
        columns={columns}
        data={category}
        searchValue={searchCategory}
        searchableFields={["id", "name"]}
        rowKey="id"
        scroll={{ x: 600 }}
      />

      {addCategoryModal && (
        <CategoryModal
          label="Add Category"
          setAddCategoryModal={setAddCategoryModal}
        />
      )}

      {deleteModal && selectedCategory && (
        <ConfirmationModal
          title="Delete Category"
          description={`Are you sure you want to delete category "${selectedCategory.name}"? This action cannot be undone.`}
          onClick={() => {
            deleteCategory(selectedCategory.id);
            setDeleteModal(false);
          }}
          onCancel={() => setDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default Brands;
