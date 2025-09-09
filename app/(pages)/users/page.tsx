import Table from "@/components/ui/table";
import React from "react";
import { FaSearch } from "react-icons/fa";

const Users = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-[#58E2A4]">Users</h1>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 bg-[#0b140b] border border-green-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      <div className="bg-[#0b140b] border border-green-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table />
        </div>
      </div>
    </div>
  );
};

export default Users;
