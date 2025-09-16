"use client";
import Input from "@/components/ui/input";
import TableUsersComponent from "@/components/ui/table/table-users";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const Users = () => {
  const [searchUsers, setSearchUsers] = useState("");
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-700 after:rounded-full after:mt-1">
          Users
        </h1>
      </div>

      <div className="max-w-[400px] w-full relative">
        <Input
          placeholder="Search users by name..."
          type="text"
          id="search"
          value={searchUsers}
          setValue={setSearchUsers}
          variant="outline"
          size="sm"
          iconLeft={<FaSearch />}
        />
      </div>

      <div className="">
        <TableUsersComponent searchUsers={searchUsers} />
      </div>
    </div>
  );
};

export default Users;
