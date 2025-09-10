"use client";
import { Routes } from "@/routes/Routes";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace(Routes.LOGIN);
    }
  }, [router]);

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold text-white">Dashboard</h1>
      <p className="text-gray-400 mt-2">
        Welcome to your Exercise and Earn admin panel
      </p>
    </div>
  );
};

export default Dashboard;
