"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { FaSignOutAlt } from "react-icons/fa";
import { Routes } from "@/routes/Routes";

const Header = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push(Routes.LOGIN);
  };

  return (
    <header className="bg-[#122820] border-b border-green-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#58E2A4]">Admin Dashboard</h1>
          <p className="text-gray-400 text-sm">Manage your application</p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-red-800/20 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          <FaSignOutAlt className="w-4 h-4" />
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
