"use client";
import { FaUser } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import Button from "./button";
import toast from "react-hot-toast";
import { removeCookie } from "@/lib/cookies";
import { Routes } from "@/routes/Routes";
import { useRouter } from "next/navigation";
import { ButtonSize, ButtonType, ButtonVariant } from "@/types/enums";

const Header = () => {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(AuthContext)!;
  const router = useRouter();
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogoutClick = () => {
    toast.success("Logged out successfully!");
    removeCookie("token");
    router.push(Routes.LOGIN);
    setIsProfileDropdownOpen(false);
  };

  return (
    <div className="z-[99] bg-[#06211e] flex justify-between items-center gap-3 px-5 py-3 fixed top-0 right-0 w-full border-b border-gray-700 shadow-lg">
      <div
        className="lg:hidden text-2xl p-2 cursor-pointer text-white"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <AiOutlineMenu />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <div className="relative cursor-pointer text-gray-300 hover:text-white transition">
          <IoIosNotifications className="size-6" />
          <span className="absolute -top-[2px] -right-0 bg-red-600 text-white text-xs font-bold rounded-full size-[10px] flex items-center justify-center"></span>
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="flex items-center justify-center p-2 text-gray-300 hover:text-white hover:bg-gray-700/30 rounded-full transition-colors duration-200 cursor-pointer"
          >
            <FaUser className="size-5" />
          </button>

          {isProfileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 bg-teal-800 rounded-xl shadow-lg py-3 px-4 z-50">
              <div className="mb-3">
                <p className="font-medium text-white">Admin</p>
                <p className="text-sm text-gray-300">{adminEmail}</p>
              </div>

              <Button
                type={ButtonType.BUTTON}
                onClick={handleLogoutClick}
                variant={ButtonVariant.SECONDARY}
                label="Logout"
                fullWidth
                size={ButtonSize.EXTRASMALL}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
