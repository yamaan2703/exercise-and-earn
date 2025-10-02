"use client";
import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import {
  ButtonVariant,
  ButtonSize,
  ButtonType,
  InputVariant,
  InputSize,
} from "@/types/enums";
import Button from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useParams, useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";
import {
  useGetCategoryByIdQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "@/redux/slices/categorySlice";
import toast from "react-hot-toast";
import Input from "@/components/ui/input";
import ConfirmationModal from "@/components/ui/modal/confirmation-modal";
import { ProductType } from "@/types/interface";

const CategoryDetail = () => {
  const { setIsSidebarOpen } = useContext(AuthContext)!;
  const router = useRouter();
  const { id } = useParams();
  const categoryId = Number(id);
  const { data, isLoading } = useGetCategoryByIdQuery(categoryId);
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const category = data?.category;

  useEffect(() => {
    if (category) {
      console.log(data);
      setCategoryName(category.name);
    }
  }, [data, category]);

  const handleUpdate = async () => {
    if (!categoryName.trim()) {
      toast.error("Category name cannot be empty!");
      return;
    }

    try {
      const response = await updateCategory({
        id: categoryId,
        name: categoryName.trim(),
      }).unwrap();

      if (response.success) {
        toast.success("Category updated successfully!");
        setIsEditing(false);
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to update category");
      console.error("Error updating category:", error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await deleteCategory(categoryId).unwrap();

      if (response.success) {
        toast.success("Category deleted successfully!");
        router.push(Routes.CATEGORY);
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to delete category");
      console.error("Error deleting category:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <Loader size="xl" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[100vh] text-white">
        <p className="text-xl mb-4">Category not found</p>
        <Button
          type={ButtonType.BUTTON}
          label="Back to Categories"
          onClick={() => router.push(Routes.CATEGORY)}
          variant={ButtonVariant.THEME}
          size={ButtonSize.MEDIUM}
        />
      </div>
    );
  }

  return (
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push(Routes.CATEGORY)}
            className="text-white hover:text-teal-400 transition-colors"
          >
            <FaArrowLeft className="size-5 sm:size-6" />
          </button>
          <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
            Category Details
          </h1>
        </div>
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>

      <div className="bg-[#0b2d29] border border-teal-500/20 rounded-xl p-4 sm:p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            {isEditing ? (
              <div className="max-w-md">
                <Input
                  id="categoryName"
                  type="text"
                  placeholder="Enter category name..."
                  value={categoryName}
                  setValue={setCategoryName}
                  variant={InputVariant.DEFAULT}
                  size={InputSize.MEDIUM}
                  required
                />
              </div>
            ) : (
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-teal-400 mb-2">
                  {category.name}
                </h2>
                <p className="text-gray-400 text-sm">
                  Category ID: #{category.id}
                </p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {isEditing ? (
              <>
                <Button
                  type={ButtonType.BUTTON}
                  label="Cancel"
                  onClick={() => {
                    setIsEditing(false);
                    setCategoryName(category.name);
                  }}
                  variant={ButtonVariant.OUTLINE}
                  size={ButtonSize.EXTRASMALL}
                />
                <Button
                  type={ButtonType.BUTTON}
                  label={isUpdating ? "Saving..." : "Save"}
                  onClick={handleUpdate}
                  variant={ButtonVariant.THEME}
                  size={ButtonSize.EXTRASMALL}
                />
              </>
            ) : (
              <>
                <Button
                  type={ButtonType.BUTTON}
                  label="Edit"
                  onClick={() => setIsEditing(true)}
                  icon={FaEdit}
                  variant={ButtonVariant.THEME}
                  size={ButtonSize.EXTRASMALL}
                />
                <Button
                  type={ButtonType.BUTTON}
                  label="Delete"
                  onClick={() => setShowDeleteConfirm(true)}
                  icon={FaTrash}
                  variant={ButtonVariant.OUTLINE}
                  size={ButtonSize.EXTRASMALL}
                />
              </>
            )}
          </div>
        </div>

        <div className="border-t border-teal-500/20 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">All Products</h3>
            <span className="text-white font-medium text-sm bg-teal-500/20 px-3 py-1 rounded-full">
              {category.products?.length || 0} product
              {category.products?.length !== 1 ? "s" : ""}
            </span>
          </div>

          {category.products && category.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {category.products.map((product: ProductType) => (
                <div
                  key={product.id}
                  className="bg-[#11413a]/40 border border-teal-500/10 rounded-lg p-4 hover:border-teal-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4
                      onClick={() =>
                        router.push(Routes.PRODUCTS_DETAIL(product.id))
                      }
                      className="text-white font-semibold text-base cursor-pointer hover:underline"
                    >
                      {product.name}
                    </h4>
                    <span className="text-teal-400 font-medium text-sm">
                      {product.calories} cal
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex gap-2">
                      <p className="text-gray-400">Price</p>
                      <p className="text-white font-medium">${product.price}</p>
                    </div>
                    <div className="flex gap-2">
                      <p className="text-gray-400">Stock</p>
                      <p className="text-white font-medium">{product.stock}</p>
                    </div>

                    {product.size && (
                      <div className="flex gap-2">
                        <p className="text-gray-400">Size</p>
                        <p className="text-white font-medium line-clamp-2">
                          {product.size}
                        </p>
                      </div>
                    )}
                    <div className="flex gap-2">
                      <p className="text-gray-400">Specs</p>
                      <p className="text-white font-medium">{product.specs}</p>
                    </div>
                    {product.description && (
                      <div className="flex gap-2">
                        <p className="text-gray-400">Description</p>
                        <p className="text-white font-medium line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">
                No products associated with this category yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {showDeleteConfirm && (
        <ConfirmationModal
          title={`Are you sure you want to delete the category "${category.name}"?`}
          description={`Warning: This category has ${category.products.length} associated products.`}
          onCancel={() => setShowDeleteConfirm(false)}
          onClick={handleDelete}
        />
      )}
    </div>
  );
};

export default CategoryDetail;
