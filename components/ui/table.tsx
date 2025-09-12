"use client";
import React, { useEffect, useState } from "react";
import type { GetProp, TableProps } from "antd";
import { Table, Popconfirm } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import type { SorterResult } from "antd/es/table/interface";
import { Gender, Status } from "@/types/enums";
import { dummyUsers } from "@/Data/Data";
import { DataType } from "@/types/interface";

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

const TableComponent = ({ searchUsers }: { searchUsers: string }) => {
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: { current: 1, pageSize: 10 },
  });

  const handleView = (record: DataType) => {
    console.log("View user:", record);
  };

  const handleDelete = (record: DataType) => {
    console.log("Deleted user:", record);
    setData((prev) => prev.filter((item) => item.id !== record.id));
  };

  const columns: ColumnsType<DataType> = [
    { title: "Name", dataIndex: "name", sorter: true, width: "20%" },
    { title: "Email", dataIndex: "email", width: "25%" },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: [
        { text: Gender.MALE, value: Gender.MALE },
        { text: Gender.FEMALE, value: Gender.FEMALE },
      ],
      width: "15%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "15%",
      filters: [
        { text: Status.ACTIVE, value: Status.ACTIVE },
        { text: Status.INACTIVE, value: Status.INACTIVE },
      ],
      render: (status: Status) => {
        const color =
          status === Status.ACTIVE ? "text-green-500" : "text-red-500";
        return <p className={color}>{status}</p>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: "15%",
      render: (_, record: DataType) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleView(record)}
            title="View Details"
            className="p-1 text-teal-400 hover:text-teal-600 transition"
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
              className="p-1 text-red-400 hover:text-red-600 transition"
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
      setData(dummyUsers);
      setLoading(false);
      setTableParams((prev) => ({
        ...prev,
        pagination: { ...prev.pagination, total: data.length },
      }));
    }, 300);
  }, []);

  // Local filtering + sorting
  const handleTableChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    let filteredData = [...dummyUsers];

    // filter by Gender
    if (filters.gender) {
      filteredData = filteredData.filter((item) =>
        (filters.gender as string[]).includes(item.gender)
      );
    }

    // filter by Status
    if (filters.status) {
      filteredData = filteredData.filter((item) =>
        (filters.status as string[]).includes(item.status)
      );
    }

    // sort by name (ascend or descend)
    if (!Array.isArray(sorter) && sorter.order && sorter.field) {
      filteredData.sort((a, b) => {
        const field = sorter.field as keyof DataType;
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
      <Table<DataType>
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data.filter((item) =>
          item.name.toLowerCase().includes(searchUsers.toLowerCase())
        )}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
      />
    </div>
  );
};

export default TableComponent;
