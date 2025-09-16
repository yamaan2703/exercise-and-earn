"use client";
import React, { useEffect, useState } from "react";
import type { GetProp, TableProps } from "antd";
import { Table, Popconfirm } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import type { SorterResult } from "antd/es/table/interface";
import { dummyProducts } from "@/Data/Data";
import { ProductType } from "@/types/interface";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const TableProductsComponent = ({
  searchProducts,
}: {
  searchProducts: string;
}) => {
  const router = useRouter();
  const [data, setData] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: { current: 1, pageSize: 10 },
  });

  const handleView = (record: ProductType) => {
    router.push(Routes.PRODUCTS_DETAIL(record.id));
  };

  const handleDelete = (record: ProductType) => {
    console.log("Deleted product:", record);
    setData((prev) => prev.filter((item) => item.id !== record.id));
  };

  const columns: ColumnsType<ProductType> = [
    { title: "Name", dataIndex: "name", sorter: true, width: "20%" },
    { title: "Category", dataIndex: "category", width: "20%" },
    {
      title: "Required Calories",
      dataIndex: "requiredCalories",
      sorter: true,
      width: "15%",
    },
    {
      title: "Delivery Fee ($)",
      dataIndex: "deliveryFee",
      sorter: true,
      width: "15%",
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
          <Popconfirm
            title="Delete User"
            description="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <button
              title="Delete User"
              className="p-1 text-white hover:text-gray-300 transition cursor-pointer"
            >
              <DeleteOutlined />
            </button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setData(dummyProducts);
      setLoading(false);
      setTableParams((prev) => ({
        ...prev,
        pagination: { ...prev.pagination, total: data.length },
      }));
    }, 300);
  }, []);

  // Local filtering + sorting
  const handleTableChange: TableProps<ProductType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    let filteredData = [...dummyProducts];

    // // filter by Status
    // if (filters.status) {
    //   filteredData = filteredData.filter((item) =>
    //     (filters.status as string[]).includes(item.status)
    //   );
    // }

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
        dataSource={data.filter((item) =>
          item.name.toLowerCase().includes(searchProducts.toLowerCase())
        )}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default TableProductsComponent;
