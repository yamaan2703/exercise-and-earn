"use client";
import Card from "@/components/ui/card";
import { FaBoxOpen, FaFireAlt, FaGift, FaUsers } from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="p-4">
      <div className="mb-8">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-700 after:rounded-full after:mt-1">
          Dashboard
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card title="Total Users" value={88} Icon={FaUsers} />
        <Card title="Calories Burnt" value={1540} Icon={FaFireAlt} />
        <Card title="Active Products" value={33} Icon={FaBoxOpen} />
        <Card title="Gifts Redeemed" value={12} Icon={FaGift} />
      </div>
    </div>
  );
};

export default Dashboard;
