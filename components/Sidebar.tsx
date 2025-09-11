"use client";
import { useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarMenu as links } from "@/Data/Data";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { cn } from "@/lib/utils";
import { FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "@/context/AuthContext";

interface MenuLink {
  to: string;
  label: string;
  icon: React.ReactElement;
  children?: MenuLink[];
  ml?: number;
}

interface OpenMenus {
  [key: string]: boolean;
}

function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen, setLogoutModal } =
    useContext(AuthContext)!;
  const pathname = usePathname();
  const [openMenus, setOpenMenus] = useState<OpenMenus>({});

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderLinks = (menuLinks: MenuLink[]) => {
    if (!menuLinks || menuLinks.length === 0) return null;

    return menuLinks.map((link, index) => {
      const key = `${link.to}-${index}`;
      const isMenuOpen = openMenus[key];
      const hasChildren = link.children && link.children.length > 0;

      const marginLeftClass = link.ml ? `ml-${link.ml}` : "";

      return (
        <div key={key} className={`space-y-1 ${marginLeftClass}`}>
          {hasChildren ? (
            <>
              <button
                onClick={() => toggleMenu(key)}
                className={cn(
                  "flex items-center justify-between w-full text-[12px] sm:text-[15px] px-3 py-2 rounded-lg transition duration-300",
                  pathname.startsWith(link.to)
                    ? "bg-[#C7E5C9] text-gray-900 shadow-md"
                    : "text-gray-600 hover:bg-[#EDF8ED] hover:text-green-900"
                )}
              >
                <span className="flex items-center space-x-3">
                  <span className="text-xl">{link.icon}</span>
                  <span className="font-medium">{link.label}</span>
                </span>
                <span>
                  {isMenuOpen ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
                </span>
              </button>
              {isMenuOpen &&
                link.children &&
                renderLinks(link.children as MenuLink[])}
            </>
          ) : (
            <Link href={link.to} onClick={() => setIsSidebarOpen(false)}>
              <p
                className={cn(
                  "flex items-center text-[12px] sm:text-[15px] space-x-3 px-3 py-2 rounded-lg transition duration-300 transform hover:scale-105 active:scale-95",
                  pathname === link.to
                    ? "text-white bg-green-700/20 border-r-2 border-l-2"
                    : "text-gray-400 hover:bg-white hover:text-[#06211E]"
                )}
              >
                <span className="text-lg">{link.icon}</span>
                <span className="font-medium text-sm">{link.label}</span>
              </p>
            </Link>
          )}
        </div>
      );
    });
  };

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-full w-[220px] sm:w-[250px] bg-[#06211e] border-r border-gray-700 shadow-lg z-[101] transform transition-transform",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full",
        "lg:translate-x-0 lg:block"
      )}
    >
      <div className="flex items-center justify-center gap-3 mx-auto border-b border-gray-700 py-4">
        <Image
          src="/Icons/logo.png"
          width={1000}
          height={1000}
          alt="Logo"
          className="size-10"
        />
        <h1 className="text-white text-sm sm:text-base font-bold">
          Exercise & Earn
        </h1>
      </div>

      <div className="flex-1 px-4 py-6 space-y-2 h-[calc(100vh-140px)] overflow-y-auto scrollbar-custom">
        <nav className="flex flex-col space-y-2">{renderLinks(links)}</nav>
      </div>

      <div className="border-t border-gray-700 mt-2">
        <button
          onClick={() => setLogoutModal(true)}
          className="absolute bottom-3 left-2 flex items-center gap-2 px-3 py-2 text-gray-300 hover:text-red-400 rounded-lg transition-colors duration-200 cursor-pointer"
        >
          <FaSignOutAlt className="size-5" />
          <span className="text-sm font-sans font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
