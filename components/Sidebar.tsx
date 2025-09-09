"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  FaHome,
  FaUsers,
  FaShieldAlt,
  FaFileContract,
  FaSignOutAlt,
} from "react-icons/fa";
import { Routes } from "@/routes/Routes";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Dashboard",
      href: Routes.DASHBOARD,
      icon: FaHome,
    },
    {
      name: "Users",
      href: Routes.USERS,
      icon: FaUsers,
    },
    {
      name: "Privacy Policy",
      href: Routes.PRIVACY_POLICY,
      icon: FaShieldAlt,
    },
    {
      name: "Terms & Conditions",
      href: Routes.TERMS_AND_CONDITIONS,
      icon: FaFileContract,
    },
  ];

  return (
    <div className="max-w-64 min-h-screen border-r border-green-800 shadow-2xl flex flex-col">
      <div className="p-[22px] border-b border-green-800">
        <div className="flex items-center gap-3 ">
          <div className="size-10">
            <Image
              src="/Icons/logo.png"
              alt="Exercise and Earn Logo"
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <h1 className="text-[#58E2A4] font-bold text-base">
            Exercise & Earn
          </h1>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer group",
                isActive
                  ? "bg-green-800/30 text-[#58E2A4] border-l-4 border-[#58E2A4]"
                  : "text-gray-300 hover:bg-green-800/20 hover:text-[#58E2A4]"
              )}
            >
              <Icon className="w-5 h-5 group-hover:translate-x-2 transition-all duration-300" />
              <span className="font-medium group-hover:translate-x-2 transition-all duration-300">
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
