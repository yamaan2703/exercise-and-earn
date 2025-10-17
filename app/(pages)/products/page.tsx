"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { EyeOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ProductType } from "@/types/interface";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";
import { ButtonType, StatusProduct } from "@/types/enums";
import { AuthContext } from "@/context/AuthContext";
import type { ColumnsType } from "antd/es/table";
import DynamicTable from "@/components/ui/table";
import ConfirmationModal from "@/components/ui/modal/confirmation-modal";
import {
  ButtonSize,
  ButtonVariant,
  InputSize,
  InputVariant,
} from "@/types/enums";
import { AiOutlineMenu } from "react-icons/ai";
import { FaPlus, FaSearch } from "react-icons/fa";
import { MdAirplanemodeActive, MdAirplanemodeInactive } from "react-icons/md";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@/redux/slices/productSlice";
import Loader from "@/components/ui/loader";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const Products = () => {
  const router = useRouter();
  const { setIsSidebarOpen, activeModal, setActiveModal } =
    useContext(AuthContext)!;
  const { data, isLoading, isError } = useGetProductsQuery(null);
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProductStatus] = useUpdateProductMutation();

  const [searchProducts, setSearchProducts] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    if (data) {
      console.log(data.products);
    }
  }, [data]);

  const sortedProducts: ProductType[] = data?.products
    ? [...data.products].sort((a, b) => b.id - a.id)
    : [];

  const handleView = (record: ProductType) => {
    router.push(Routes.PRODUCTS_DETAIL(record.id));
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const res = await deleteProduct(id).unwrap();

      toast.success("Product deleted successfully!");
      console.log("Deleted:", res);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product");
    }
  };

  const handleUpdateProductStatus = async (id: number) => {
    try {
      const res = await updateProductStatus({
        id,
        status: StatusProduct.INACTIVE,
      }).unwrap();

      if (res.success) {
        toast.success("Product status updated to inactive");
        console.log("Updated:", res);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update product status");
    }
  };

  const columns: ColumnsType<ProductType> = [
    { title: "Product Name", dataIndex: "name", sorter: true, width: "15%" },
    { title: "Category", dataIndex: ["category", "name"], width: "15%" },
    { title: "Brand", dataIndex: ["brand", "name"], width: "15%" },
    {
      title: "Calories",
      dataIndex: "calories",
      sorter: true,
      width: "15%",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      filters: [
        { text: "All Stock", value: "all" },
        { text: "Stock less than 5", value: "low" },
      ],
      onFilter: (value, record) => {
        const stockValue = record.stock;
        if (value === "all") return true;
        if (value === "low") return stockValue <= 5;
        return true;
      },
      width: "13%",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: true,
      width: "15%",
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      filters: [
        { text: StatusProduct.ACTIVE, value: StatusProduct.ACTIVE },
        { text: StatusProduct.INACTIVE, value: StatusProduct.INACTIVE },
      ],
      render: (status: StatusProduct) => {
        const color =
          status === StatusProduct.ACTIVE ? "text-green-500" : "text-red-500";
        return <p className={color}>{status}</p>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      render: (_, record: ProductType) => (
        <div className="flex gap-1">
          <button
            onClick={() => handleView(record)}
            title="View Details"
            className="p-1 text-white hover:text-gray-300 transition cursor-pointer"
          >
            <EyeOutlined />
          </button>
          <button
            onClick={() => router.push(Routes.EDIT_PRODUCT(record.id))}
            title="Edit Product"
            className="p-1 text-white hover:text-gray-300 transition cursor-pointer"
          >
            <EditOutlined />
          </button>
          <button
            onClick={() => {
              setActiveModal(true);
              setSelectedProduct(record);
            }}
            title="update product status"
            className={cn(
              "p-1 text-white hover:text-gray-300 transition cursor-pointer",
              record.status === StatusProduct.INACTIVE &&
                "opacity-50 cursor-not-allowed"
            )}
            disabled={record.status === StatusProduct.INACTIVE}
          >
            {record.status === StatusProduct.ACTIVE ? (
              <MdAirplanemodeActive />
            ) : (
              <MdAirplanemodeInactive />
            )}
          </button>
          <button
            onClick={() => {
              setDeleteModal(true);
              setSelectedProduct(record);
            }}
            title="Delete Product"
            className="p-1 text-white hover:text-gray-300 transition cursor-pointer"
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
          Products
        </h1>
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>

      <div className="flex justify-between gap-2 mb-2">
        <div className="max-w-[400px] w-full">
          <Input
            placeholder="Search products by product name..."
            type="text"
            id="search"
            value={searchProducts}
            setValue={setSearchProducts}
            variant={InputVariant.OUTLINE}
            size={InputSize.SMALL}
            iconLeft={<FaSearch />}
          />
        </div>
        <Button
          type={ButtonType.BUTTON}
          variant={ButtonVariant.THEME}
          size={ButtonSize.SMALL}
          label="Add Product"
          icon={FaPlus}
          onClick={() => router.push(Routes.ADD_PRODUCT)}
        />
      </div>
      {isLoading ? (
        <p className="flex justify-center items-center min-h-[100vh]">
          <Loader size="xl" />
        </p>
      ) : isError ? (
        <p className="text-red-500">Failed to load product.</p>
      ) : (
        <DynamicTable<ProductType>
          columns={columns}
          data={sortedProducts}
          searchValue={searchProducts}
          searchableFields={["name", "category"]}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      )}

      {activeModal && selectedProduct?.status === StatusProduct.ACTIVE && (
        <ConfirmationModal
          title="Confirm Inactive Product"
          description={`Are you sure you want to deactivate "${selectedProduct.name}"?`}
          onClick={() => {
            if (selectedProduct) {
              handleUpdateProductStatus(selectedProduct.id);
            }
            setActiveModal(false);
          }}
          onCancel={() => setActiveModal(false)}
        />
      )}

      {deleteModal && selectedProduct && (
        <ConfirmationModal
          title="Confirm Delete Product"
          description={`Are you sure you want to delete "${selectedProduct.name}"?`}
          onClick={() => {
            if (selectedProduct) {
              handleDeleteProduct(selectedProduct.id);
            }
            setDeleteModal(false);
          }}
          onCancel={() => setDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default Products;
