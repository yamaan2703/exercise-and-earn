"use client";
import Input from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { EyeOutlined, PoweroffOutlined, StopOutlined } from "@ant-design/icons";
import { Gender, StatusUser } from "@/types/enums";
import { UserType } from "@/types/interface";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";
import { AuthContext } from "@/context/AuthContext";
import type { ColumnsType } from "antd/es/table";
import ConfirmationModal from "@/components/ui/modal/confirmation-modal";
import { InputSize, InputVariant } from "@/types/enums";
import { AiOutlineMenu } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import DynamicTable from "@/components/ui/table";
import {
  useActivateUserMutation,
  useBanUserMutation,
  useDeactivateUserMutation,
  useGetUsersQuery,
} from "@/redux/slices/userSlice";
import { cn } from "@/lib/utils";

const Users = () => {
  const router = useRouter();
  const {
    setIsSidebarOpen,
    activeModal,
    setActiveModal,
    banModal,
    setBanModal,
  } = useContext(AuthContext)!;
  const { data, isLoading, isError } = useGetUsersQuery(null);
  const [activateUser] = useActivateUserMutation();
  const [deactivateUser] = useDeactivateUserMutation();
  const [banUser] = useBanUserMutation();
  const [searchUsers, setSearchUsers] = useState("");
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  const handleView = (record: UserType) => {
    router.push(Routes.USERS_DETAIL(record.id));
  };

  const handleUpdateUserStatus = (user: UserType) => {
    if (user.status === StatusUser.ACTIVE) {
      deactivateUser(user.id);
    } else {
      activateUser(user.id);
    }
  };

  const columns: ColumnsType<UserType> = [
    { title: "Name", dataIndex: "name", sorter: true, width: "10%" },
    { title: "Email", dataIndex: "email", width: "15%" },
    { title: "Phone", dataIndex: "phone", width: "15%" },
    { title: "Created At", dataIndex: "createdAt", sorter: true, width: "15%" },
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
        { text: StatusUser.BANNED, value: StatusUser.BANNED },
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
      render: (record: UserType) => (
        <div className="flex gap-1">
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
            title="update user status"
            className={cn(
              "p-1 text-white hover:text-gray-300 transition cursor-pointer",
              record.status === StatusUser.INACTIVE &&
                "opacity-50 cursor-not-allowed"
            )}
          >
            <PoweroffOutlined />
          </button>
          <button
            onClick={() => {
              setBanModal(true);
              setSelectedUser(record);
            }}
            title="ban user"
            className="p-1 text-white hover:text-gray-300 transition cursor-pointer"
          >
            <StopOutlined />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-2 p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
          Users
        </h1>
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>

      <div className="max-w-[400px] w-full relative">
        <Input
          placeholder="Search users by name, email or phone..."
          type="text"
          id="search"
          value={searchUsers}
          setValue={setSearchUsers}
          variant={InputVariant.OUTLINE}
          size={InputSize.SMALL}
          iconLeft={<FaSearch />}
        />
      </div>

      {isLoading ? (
        <p className="text-white">Loading users...</p>
      ) : isError ? (
        <p className="text-red-500">Failed to load users.</p>
      ) : (
        <DynamicTable<UserType>
          columns={columns}
          data={data.users}
          searchValue={searchUsers}
          searchableFields={["name", "email", "phone"]}
          rowKey="id"
          scroll={{ x: 800 }}
        />
      )}

      {activeModal && selectedUser?.status === StatusUser.ACTIVE && (
        <ConfirmationModal
          title="Confirm Inactive User"
          description="Are you sure you want to deactivate this user?"
          onClick={() => {
            if (selectedUser) {
              handleUpdateUserStatus(selectedUser);
            }
            setActiveModal(false);
          }}
          onCancel={() => setActiveModal(false)}
        />
      )}

      {banModal && (
        <ConfirmationModal
          title="Confirm Ban User"
          description="Are you sure you want to ban this user? This action cannot be undone."
          onClick={() => {
            if (selectedUser) {
              banUser(selectedUser.id);
            }
            setBanModal(false);
          }}
          onCancel={() => setBanModal(false)}
        />
      )}
    </div>
  );
};

export default Users;
