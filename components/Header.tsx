"use client";
import { FaSignOutAlt } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useState } from "react";
import LogoutModal from "./logout-modal";

const Header = ({
  toggleSidebar,
  isSidebarOpen,
}: {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}) => {
  const [logoutModal, setLogoutModal] = useState(false);

  return (
    <div className="z-[99] bg-[#0b1220] flex justify-between items-center gap-3 px-5 py-3 fixed top-0 right-0 w-full border-b border-gray-400 shadow-md">
      <div
        className="lg:hidden text-2xl p-2 cursor-pointer text-white"
        onClick={toggleSidebar}
      >
        <AiOutlineMenu />
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <div className="relative cursor-pointer text-gray-300 hover:text-white transition">
          <IoMdNotificationsOutline className="size-6" />
          <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </div>

        <button
          onClick={() => setLogoutModal(true)}
          className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-red-400 hover:bg-red-800/20 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          <FaSignOutAlt className="size-5" />
          <span className="hidden sm:block text-sm font-medium">Logout</span>
        </button>
      </div>
      {logoutModal && (
        <LogoutModal
          logoutModal={logoutModal}
          setLogoutModal={setLogoutModal}
        />
      )}
    </div>
  );
};

export default Header;
