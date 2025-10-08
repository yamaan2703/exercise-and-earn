"use client";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaPlus, FaSearch, FaEye, FaTrash } from "react-icons/fa";
import { EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { Routes } from "@/routes/Routes";
import { BrandItem } from "@/types/interface";
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
import BrandModal from "@/components/ui/modal/brand-modal";
import DynamicTable from "@/components/ui/table";
import ConfirmationModal from "@/components/ui/modal/confirmation-modal";
import {
  useDeleteBrandMutation,
  useGetBrandsQuery,
  useUpdateBrandMutation,
} from "@/redux/slices/brandSlice";
import type { ColumnsType } from "antd/es/table";
import toast from "react-hot-toast";

const Brands = () => {
  const { setIsSidebarOpen } = useContext(AuthContext)!;
  const router = useRouter();

  const { data, isLoading, isError } = useGetBrandsQuery(null);
  const [deleteBrand] = useDeleteBrandMutation();
  const [updateBrand, { isLoading: isUpdating }] = useUpdateBrandMutation();

  const [addBrandModal, setAddBrandModal] = useState(false);
  const [editBrandModal, setEditBrandModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState<BrandItem | null>(null);
  const [searchBrand, setSearchBrand] = useState("");
  const [editName, setEditName] = useState("");

  const brands = data?.brands ?? [];

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  const handleView = (brand: BrandItem) => {
    router.push(Routes.BRANDID(brand.id));
  };

  const handleEditClick = (brand: BrandItem) => {
    setSelectedBrand(brand);
    setEditName(brand.name);
    setEditBrandModal(true);
  };

  const handleEditSave = async () => {
    if (!editName.trim()) {
      toast.error("Brand name cannot be empty!");
      return;
    }

    try {
      const response = await updateBrand({
        id: selectedBrand?.id,
        name: editName.trim(),
      }).unwrap();

      if (response.success) {
        toast.success("Brand updated successfully!");
        setEditBrandModal(false);
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to update brand");
      console.error("Error updating brand:", error);
    }
  };

  const columns: ColumnsType<BrandItem> = [
    {
      title: "ID",
      dataIndex: "id",
      sorter: true,
      width: "15%",
    },
    {
      title: "Brand Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Actions",
      key: "actions",
      width: "20%",
      render: (record: BrandItem) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleView(record)}
            title="View Brand"
            className="p-1 text-white hover:text-gray-300 transition cursor-pointer"
          >
            <FaEye />
          </button>
          <button
            onClick={() => handleEditClick(record)}
            title="Edit Brand"
            className="p-1 text-white hover:text-gray-300 transition cursor-pointer"
          >
            <EditOutlined />
          </button>
          <button
            onClick={() => {
              setDeleteModal(true);
              setSelectedBrand(record);
            }}
            title="Delete Brand"
            className="p-1 text-white hover:text-gray-300 transition cursor-pointer"
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
        Failed to load brands. Please try again.
      </p>
    );
  }

  return (
    <div className="space-y-2 p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
          Brands
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
            placeholder="Search brand by name or ID..."
            type="text"
            id="search"
            value={searchBrand}
            setValue={setSearchBrand}
            variant={InputVariant.OUTLINE}
            size={InputSize.SMALL}
            iconLeft={<FaSearch />}
          />
        </div>
        <Button
          type={ButtonType.BUTTON}
          label="Add Brand"
          onClick={() => setAddBrandModal(true)}
          icon={FaPlus}
          variant={ButtonVariant.THEME}
          size={ButtonSize.SMALL}
        />
      </div>

      <DynamicTable<BrandItem>
        columns={columns}
        data={brands}
        searchValue={searchBrand}
        searchableFields={["id", "name"]}
        rowKey="id"
        scroll={{ x: 600 }}
      />

      {addBrandModal && (
        <BrandModal label="Add Brand" setAddBrandModal={setAddBrandModal} />
      )}

      {editBrandModal && selectedBrand && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]">
          <div className="bg-[#06211e] text-white w-[90%] max-w-sm rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center gap-2 mb-3">
              <h2 className="text-lg font-semibold">Edit Brand</h2>
              <button
                onClick={() => setEditBrandModal(false)}
                className="text-white hover:text-gray-400 cursor-pointer text-xl leading-none"
              >
                X
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <Input
                id="editName"
                type="text"
                label="Brand Name"
                placeholder="Enter brand name..."
                value={editName}
                setValue={setEditName}
                variant={InputVariant.DEFAULT}
                size={InputSize.SMALL}
                required
              />

              <Button
                type={ButtonType.BUTTON}
                externalStyles="mt-3"
                label={isUpdating ? "Saving..." : "Save Changes"}
                onClick={handleEditSave}
                variant={ButtonVariant.THEME}
                size={ButtonSize.SMALL}
              />
            </div>
          </div>
        </div>
      )}

      {deleteModal && selectedBrand && (
        <ConfirmationModal
          title="Delete Brand"
          description={`Are you sure you want to delete brand "${selectedBrand.name}"? This action cannot be undone.`}
          onClick={() => {
            deleteBrand(selectedBrand.id);
            setDeleteModal(false);
          }}
          onCancel={() => setDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default Brands;
