"use client";
import Button from "@/components/ui/button";
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
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-white after:rounded-full after:mt-1">
          Users
        </h1>
        <div
          className="lg:hidden text-2xl p-2 cursor-pointer text-white"
          onClick={toggleSidebar}
        >
          <AiOutlineMenu />
        </div>
      </div>

      <div className="">
        <div className="max-w-[400px] w-full relative">
          <Input
            placeholder="Search users..."
            type="text"
            id="search"
            value={searchUsers}
            setValue={setSearchUsers}
            variant="outline"
            size="sm"
            iconLeft={<FaSearch />}
          />
        </div>
      </div>

      <div className="">
        <TableComponent />
      </div>
    </div>
  );
};

export default Users;
