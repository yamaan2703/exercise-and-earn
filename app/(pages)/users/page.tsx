"use client";
import Input from "@/components/ui/input";
import TableUsersComponent from "@/components/ui/table/table-users";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

const Users = () => {
  const [searchUsers, setSearchUsers] = useState("");
  const { toggleSidebar } = useContext(AuthContext)!;
  return (
    <div className="space-y-2 p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-700 after:rounded-full after:mt-1">
          Users
        </h1>
        <div
          onClick={() => toggleSidebar()}
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
