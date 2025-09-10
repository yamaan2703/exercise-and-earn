"use client";
import App from "@/components/ui/table";
import { Routes } from "@/routes/Routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const Users = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace(Routes.LOGIN);
    }
  }, [router]);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Users</h1>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            className="max-w-[400px] w-full pl-10 pr-4 py-2 bg-[#1e293b] rounded-lg text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="border border-gray-800 rounded-lg mt-3">
        <App />
      </div>
    </div>
  );
};

export default Users;
