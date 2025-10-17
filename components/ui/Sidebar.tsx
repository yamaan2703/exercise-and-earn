"use client";
import { ReactElement, useContext, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sidebarMenu as links } from "@/Data/Data";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { cn } from "@/lib/utils";
import { AuthContext } from "@/context/AuthContext";
import Button from "./button";
import { ButtonSize, ButtonType, ButtonVariant } from "@/types/enums";

interface MenuLink {
  to: string;
  label: string;
  icon: ReactElement;
  children?: MenuLink[];
}

interface OpenMenus {
  [key: string]: boolean;
}

function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen, setLogoutModal } =
    useContext(AuthContext)!;
  const [openMenus, setOpenMenus] = useState<OpenMenus>({});
  const pathname = usePathname();
  const router = useRouter();

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

      return (
        <div key={key} className="space-y-1 ">
          {hasChildren ? (
            <>
              <button
                onClick={() => {
                  router.push(link.to);
                  toggleMenu(key);
                }}
                className={cn(
                  "flex items-center justify-between w-full text-[12px] sm:text-[15px] px-3 py-2 rounded-lg transition duration-300",
                  pathname.startsWith(link.to)
                    ? "text-white bg-green-700/20 border-r-2 border-l-2"
                    : "text-gray-400 hover:bg-white hover:text-[#06211E]"
                )}
              >
                <span className="flex items-center space-x-3">
                  <span className="text-lg">{link.icon}</span>
                  <span className="font-medium text-sm">{link.label}</span>
                </span>
                <span>
                  {isMenuOpen ? (
                    <MdKeyboardArrowUp className="size-6" />
                  ) : (
                    <MdKeyboardArrowDown className="size-6" />
                  )}
                </span>
              </button>
              <div className="px-4 space-y-2">
                {isMenuOpen &&
                  link.children &&
                  renderLinks(link.children as MenuLink[])}
              </div>
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
      <div className="flex items-center justify-center gap-3 border-b border-gray-700 py-4">
        <Image
          src="/Icons/logo.svg"
          width={1000}
          height={1000}
          alt="Logo"
          className="size-9"
        />
        <h1 className="text-white text-sm sm:text-base font-bold">
          Exercise & Earn
        </h1>
      </div>

      <div className="flex-1 px-4 py-6 space-y-2 h-[calc(100vh-100px)] overflow-y-auto scrollbar-hide">
        <nav className="flex flex-col space-y-2">{renderLinks(links)}</nav>
      </div>

      <div className="px-3 py-2 mt-[-20px]">
        <Button
          type={ButtonType.BUTTON}
          variant={ButtonVariant.THEME}
          size={ButtonSize.SMALL}
          label="Logout"
          onClick={() => setLogoutModal(true)}
          externalStyles="font-semibold"
          fullWidth
        />
      </div>
    </aside>
  );
}

export default Sidebar;
