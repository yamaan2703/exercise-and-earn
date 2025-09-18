"use client";
import React, { useContext, useEffect, useState } from "react";
import type { GetProp, TableProps } from "antd";
import { Table } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import type { SorterResult } from "antd/es/table/interface";
import { ProductType } from "@/types/interface";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";
import { StatusProduct } from "@/types/enums";
import ConfirmationModal from "@/components/confirmation-modal";
import { AuthContext } from "@/context/AuthContext";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<ProductType>["field"];
  sortOrder?: SorterResult<ProductType>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const TableProductsComponent = ({
  searchProducts,
}: {
  searchProducts: string;
}) => {
  const router = useRouter();
  const { activeModal, setActiveModal, products } = useContext(AuthContext)!;
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: { current: 1, pageSize: 10 },
  });

  const handleView = (record: ProductType) => {
    router.push(Routes.PRODUCTS_DETAIL(record.id));
  };

  const columns: ColumnsType<ProductType> = [
    { title: "Name", dataIndex: "name", sorter: true, width: "18%" },
    { title: "Category", dataIndex: "category", width: "18%" },
    {
      title: "Required Calories",
      dataIndex: "requiredCalories",
      width: "18%",
    },
    { title: "Created At", dataIndex: "createdAt", width: "18%" },
    {
      title: "Status",
      dataIndex: "status",
      width: "15%",
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
        <div className="flex gap-2">
          <button
            onClick={() => handleView(record)}
            title="View Details"
            className="p-1 text-white hover:text-gray-300 transition cursor-pointer"
          >
            <EyeOutlined />
          </button>
          <button
            onClick={() => {
              setActiveModal(true);
              setSelectedProduct(record);
            }}
            title="Delete User"
            className="p-1 text-white hover:text-gray-300 transition cursor-pointer"
          >
            <DeleteOutlined />
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(products);
      setLoading(false);
      setTableParams((prev) => ({
        ...prev,
        pagination: { ...prev.pagination, total: products.length },
      }));
    }, 300);
  }, [products]);

  const handleUpdateProductStatus = (id: string, status: StatusProduct) => {
    setData((prev) =>
      prev.map((product) =>
        product.id === id ? { ...product, status } : product
      )
    );
  };

  // Local filtering + sorting
  const handleTableChange: TableProps<ProductType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    let filteredData = [...products];

    if (filters.status) {
      filteredData = filteredData.filter((item) =>
        (filters.status as string[]).includes(item.status)
      );
    }

    if (!Array.isArray(sorter) && sorter.order && sorter.field) {
      const field = sorter.field as keyof ProductType | undefined;

      if (field) {
        filteredData.sort((a, b) => {
          const aVal = a[field] as number | string;
          const bVal = b[field] as number | string;

          if (aVal < bVal) return sorter.order === "ascend" ? -1 : 1;
          if (aVal > bVal) return sorter.order === "ascend" ? 1 : -1;
          return 0;
        });
      }
    }

    setData(filteredData);
    setTableParams({
      pagination,
      filters,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
    });
  };

  return (
    <div className="overflow-auto border border-gray-400 rounded-lg">
      <Table<ProductType>
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data.filter(
          (item) =>
            item.name.toLowerCase().includes(searchProducts.toLowerCase()) ||
            item.category.toLowerCase().includes(searchProducts.toLowerCase())
        )}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
      />

      {activeModal && (
        <ConfirmationModal
          title={"Confirm Inactive Product"}
          description={"Are you sure you want to make this product inactive?"}
          onClick={() => {
            if (selectedProduct) {
              handleUpdateProductStatus(
                selectedProduct.id,
                StatusProduct.INACTIVE
              );
            }
            setActiveModal(false);
          }}
          onCancel={() => setActiveModal(false)}
        />
      )}
    </div>
  );
};

export default TableProductsComponent;
