"use client";
import React, { useEffect, useState } from "react";
import type { GetProp, TableProps } from "antd";
import { Table, Popconfirm } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import type { SorterResult } from "antd/es/table/interface";
import { useRouter } from "next/navigation";
import { GiftType } from "@/types/interface";
import { dummyGifts } from "@/Data/Data";
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

const TableGiftsComponent = ({ searchGifts }: { searchGifts: string }) => {
  const router = useRouter();
  const [data, setData] = useState<GiftType[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: { current: 1, pageSize: 10 },
  });

  const handleView = (record: GiftType) => {
    router.push(Routes.GIFTS_DETAIL(record.id));
  };

  const handleDelete = (record: GiftType) => {
    console.log("Deleted gift:", record);
    setData((prev) => prev.filter((item) => item.id !== record.id));
  };

  const columns: ColumnsType<GiftType> = [
    { title: "Name", dataIndex: "name", sorter: true, width: "30%" },
    { title: "Type", dataIndex: "type", width: "25%" },
    {
      title: "Points Required",
      dataIndex: "points",
      sorter: true,
      width: "20%",
    },
    {
      title: "Actions",
      key: "actions",
      width: "25%",
      render: (_, record: GiftType) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleView(record)}
            title="View Details"
            className="p-1 text-teal-400 hover:text-teal-600 transition cursor-pointer"
          >
            <EyeOutlined />
          </button>
          <Popconfirm
            title="Delete Gift"
            description="Are you sure you want to delete this gift?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <button
              title="Delete Gift"
              className="p-1 text-red-400 hover:text-red-600 transition cursor-pointer"
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
      setData(dummyGifts);
      setLoading(false);
      setTableParams((prev) => ({
        ...prev,
        pagination: { ...prev.pagination, total: dummyGifts.length },
      }));
    }, 300);
  }, []);

  const handleTableChange: TableProps<GiftType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    let filteredData = [...dummyGifts];

    if (!Array.isArray(sorter) && sorter.order && sorter.field) {
      filteredData.sort((a, b) => {
        const field = sorter.field as keyof GiftType;
        if (a[field] < b[field]) return sorter.order === "ascend" ? -1 : 1;
        if (a[field] > b[field]) return sorter.order === "ascend" ? 1 : -1;
        return 0;
      });
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
      <Table<GiftType>
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data.filter((item) =>
          item.name.toLowerCase().includes(searchGifts.toLowerCase())
        )}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default TableGiftsComponent;
