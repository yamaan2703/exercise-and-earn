"use client";
import Input from "@/components/ui/input";
import TableGiftsComponent from "@/components/ui/table/table-gifts";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";

const Gifts = () => {
  const { toggleSidebar } = useContext(AuthContext)!;
  const [searchGifts, setSearchGifts] = useState("");
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-2">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-700 after:rounded-full after:mt-1">
          Gifts
        </h1>
        <div
          className="lg:hidden text-2xl p-2 cursor-pointer text-white"
          onClick={toggleSidebar}
        >
          <AiOutlineMenu />
        </div>
      </div>

      <div className="max-w-[400px] w-full relative">
        <Input
          placeholder="Search gifts by name..."
          type="text"
          id="search"
          value={searchGifts}
          setValue={setSearchGifts}
          variant="outline"
          size="sm"
          iconLeft={<FaSearch />}
        />
      </div>

      <div className="">
        <TableGiftsComponent searchGifts={searchGifts} />
      </div>
    </div>
  );
};

export default Gifts;
