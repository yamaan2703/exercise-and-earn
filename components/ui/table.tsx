import React, { useEffect, useState } from "react";
import type { GetProp, TableProps } from "antd";
import { Table, Tag, Button, Space, Popconfirm } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import type { AnyObject } from "antd/es/_util/type";
import type { SorterResult } from "antd/es/table/interface";
import { Status } from "@/types/enums";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface DataType {
  name: string;
  gender: string;
  email: string;
  id: string;
  status?: "active" | "inactive"; // Added status field
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>["field"];
  sortOrder?: SorterResult<any>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const toURLSearchParams = <T extends AnyObject>(record: T) => {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(record)) {
    params.append(key, value);
  }
  return params;
};

const getRandomuserParams = (params: TableParams) => {
  const { pagination, filters, sortField, sortOrder, ...restParams } = params;
  const result: Record<string, any> = {};

  // https://github.com/mockapi-io/docs/wiki/Code-examples#pagination
  result.limit = pagination?.pageSize;
  result.page = pagination?.current;

  // https://github.com/mockapi-io/docs/wiki/Code-examples#filtering
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        result[key] = value;
      }
    });
  }

  // https://github.com/mockapi-io/docs/wiki/Code-examples#sorting
  if (sortField) {
    result.orderby = sortField;
    result.order = sortOrder === "ascend" ? "asc" : "desc";
  }

  // 处理其他参数
  Object.entries(restParams).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      result[key] = value;
    }
  });

  return result;
};

const TableComponent: React.FC = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  // Handle view action
  const handleView = (record: DataType) => {
    console.log("View user:", record);
  };

  // Handle delete action
  const handleDelete = (record: DataType) => {
    console.log("Delete user:", record);
    setData((prev) => prev?.filter((item) => item.id !== record.id));
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "25%",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: [
        { text: "Male", value: "male" },
        { text: "Female", value: "female" },
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
        const color = status === Status.ACTIVE ? "green" : "red";
        const text = status === Status.ACTIVE ? "Active" : "Inactive";
        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: "25%",
      render: (_, record: DataType) => (
        <div className="flex gap-1">
          <Button
            type="default"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
            title="View Details"
            className="text-white bg-white"
          />
          <Popconfirm
            title="Delete User"
            description="Are you sure you want to delete this user?"
            onConfirm={() => handleDelete(record)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Button
              type="default"
              icon={<DeleteOutlined />}
              danger
              title="Delete User"
              className="!text-red-500 hover:!text-red-700"
            />
          </Popconfirm>
        </div>
      ),
    },
  ];

  const params = toURLSearchParams(getRandomuserParams(tableParams));

  const fetchData = () => {
    setLoading(true);
    fetch(
      `https://660d2bd96ddfa2943b33731c.mockapi.io/api/users?${params.toString()}`
    )
      .then((res) => res.json())
      .then((res) => {
        // Add random status to each user since API might not have it
        const dataWithStatus = Array.isArray(res)
          ? res.map((user: any) => ({
              ...user,
              status:
                user.status || (Math.random() > 0.5 ? "active" : "inactive"),
            }))
          : [];

        setData(dataWithStatus);
        setLoading(false);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: 100,
            // 100 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(fetchData, [
    tableParams.pagination?.current,
    tableParams.pagination?.pageSize,
    tableParams?.sortOrder,
    tableParams?.sortField,
    JSON.stringify(tableParams.filters),
  ]);

  const handleTableChange: TableProps<DataType>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <div className="overflow-auto">
      <Table<DataType>
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 800 }} // Add horizontal scroll for better mobile experience
      />
    </div>
  );
};

export default TableComponent;
