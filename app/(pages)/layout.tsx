"use client";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ConfirmationModal from "@/components/confirmation-modal";
import { getCookie } from "@/lib/cookies";
import { usePathname, useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";
import { AuthContext } from "@/context/AuthContext";

const Layout = ({ children }: PropsWithChildren) => {
  const { isSidebarOpen, setIsSidebarOpen, logoutModal, setLogoutModal } =
    useContext(AuthContext)!;
  const router = useRouter();
  const pathname = usePathname();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const token = getCookie("token");
    const publicRoutes = ["/login"];
    const isPublicRoute = publicRoutes.includes(pathname);

    if (token) {
      if (pathname === "/login") {
        router.replace(Routes.DASHBOARD);
      }
    } else {
      if (!isPublicRoute) {
        router.replace(Routes.LOGIN);
      }
    }

    if (pathname === "/") {
      if (token) {
        router.replace(Routes.DASHBOARD);
      } else {
        router.replace(Routes.LOGIN);
      }
    }
  }, [pathname, router]);

  return (
    <div className="flex min-h-screen overflow-hidden">
      <div
        className={`fixed inset-y-0 left-0 z-50 w-60 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar />
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        {/* <Header /> */}
        {/* bg-[#010C12] */}
        <main className="flex-1 bg-[#06211E]/95 p-2 ml-0 pt-10 transition-all duration-300">
          {children}
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {logoutModal && (
        <ConfirmationModal
          title={"Confirm Logout"}
          description={"Are you sure you want to log out?"}
        />
      )}
    </div>
  );
};

export default Layout;
