"use client";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";

const Dashboard = () => {
  const { toggleSidebar } = useContext(AuthContext)!;
  return (
    <div>
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Dashboard</h1>
        <div
          className="lg:hidden text-2xl p-2 cursor-pointer text-white"
          onClick={toggleSidebar}
        >
          <AiOutlineMenu />
        </div>
      </div>
      <p className="text-gray-400 mt-2">
        Welcome to your Exercise and Earn admin panel
      </p>
    </div>
  );
};

export default Dashboard;
