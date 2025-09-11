"use client";
import Input from "@/components/ui/input";
import TableComponent from "@/components/ui/table";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

const Users = () => {
  const { toggleSidebar } = useContext(AuthContext)!;
  const [searchUsers, setSearchUsers] = useState("");
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-3xl font-bold text-white">Users</h1>
        <div
          className="lg:hidden text-2xl p-2 cursor-pointer text-white"
          onClick={toggleSidebar}
        >
          <AiOutlineMenu />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Input
            placeholder="Search users..."
            type="text"
            id="search"
            value={searchUsers}
            setValue={setSearchUsers}
            variant="outline"
            size="md"
            iconLeft={<FaSearch />}
          />
        </div>
      </div>

      <div className="border border-gray-800 rounded-lg mt-3">
        <TableComponent />
      </div>
    </div>
  );
};

export default Users;
