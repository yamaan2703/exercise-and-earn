"use client";
import React, { useContext, useEffect, useState } from "react";
import type { GetProp, TableProps } from "antd";
import { Table } from "antd";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import type { SorterResult } from "antd/es/table/interface";
import { Gender, StatusUser } from "@/types/enums";
import { dummyUsers } from "@/Data/Data";
import { DataType } from "@/types/interface";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";
import { AuthContext } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import ConfirmationModal from "@/components/confirmation-modal";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<DataType>["field"];
  sortOrder?: SorterResult<DataType>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

const TableUsersComponent = ({ searchUsers }: { searchUsers: string }) => {
  const router = useRouter();
  const { activeModal, setActiveModal } = useContext(AuthContext)!;
  const [data, setData] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<DataType | null>(null);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: { current: 1, pageSize: 10 },
  });

  const handleView = (record: DataType) => {
    router.push(Routes.USERS_DETAIL(record.id));
  };

  const columns: ColumnsType<DataType> = [
    { title: "Name", dataIndex: "name", sorter: true, width: "10%" },
    { title: "Email", dataIndex: "email", width: "15%" },
    { title: "Phone", dataIndex: "phone", width: "15%" },
    { title: "Created At", dataIndex: "createdAt", width: "15%" },
    {
      title: "Gender",
      dataIndex: "gender",
      filters: [
        { text: Gender.MALE, value: Gender.MALE },
        { text: Gender.FEMALE, value: Gender.FEMALE },
      ],
      width: "10%",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      filters: [
        { text: StatusUser.ACTIVE, value: StatusUser.ACTIVE },
        { text: StatusUser.INACTIVE, value: StatusUser.INACTIVE },
      ],
      render: (status: StatusUser) => {
        const color =
          status === StatusUser.ACTIVE ? "text-green-500" : "text-red-500";
        return <p className={color}>{status}</p>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: "10%",
      render: (_, record: DataType) => (
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
              setSelectedUser(record);
            }}
            disabled={record.status === StatusUser.INACTIVE}
            title="Delete User"
            className={cn(
              "p-1 text-white hover:text-gray-300 transition cursor-pointer",
              record.status === StatusUser.INACTIVE &&
                "opacity-50 cursor-not-allowed"
            )}
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
      setData(dummyUsers);
      setLoading(false);
      setTableParams((prev) => ({
        ...prev,
        pagination: { ...prev.pagination, total: dummyUsers.length },
      }));
    }, 300);
  }, []);

  const handleUpdateUserStatus = (id: string, status: StatusUser) => {
    setData((prev) =>
      prev.map((user) => (user.id === id ? { ...user, status } : user))
    );
  };

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
        dataSource={data.filter(
          (item) =>
            item.name.toLowerCase().includes(searchUsers.toLowerCase()) ||
            item.email.toLowerCase().includes(searchUsers.toLowerCase()) ||
            item.phone.includes(searchUsers)
        )}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
        scroll={{ x: 800 }}
      />

      {activeModal && (
        <ConfirmationModal
          title={"Confirm Inactive User"}
          description={"Are you sure you want to make this user inactive?"}
          onClick={() => {
            if (selectedUser) {
              handleUpdateUserStatus(selectedUser.id, StatusUser.INACTIVE);
            }
            setActiveModal(false);
          }}
          onCancel={() => setActiveModal(false)}
        />
      )}
    </div>
  );
};

export default TableUsersComponent;
