"use client";
import Input from "@/components/ui/input";
import TableComponent from "@/components/ui/table";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Users = () => {
  const [searchUsers, setSearchUsers] = useState("");
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Users</h1>

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
