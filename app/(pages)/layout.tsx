"use client";
import { PropsWithChildren, useContext, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ConfirmationModal from "@/components/confirmation-modal";
import { getCookie } from "@/lib/cookies";
import { usePathname, useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";
import { AuthContext } from "@/context/AuthContext";

const Layout = ({ children }: PropsWithChildren) => {
  const {
    isSidebarOpen,
    setIsSidebarOpen,
    logoutModal,
    setLogoutModal,
    handleLogoutClick,
  } = useContext(AuthContext)!;
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
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        {/* <Header /> */}
        <main className="flex-1 bg-[#06211E]/95 p-2 lg:ml-[16rem] ml-0 pt-4 transition-all duration-300">
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
          description={"Are you sure you want to logout?"}
          onClick={() => handleLogoutClick()}
          onCancel={() => setLogoutModal(false)}
        />
      )}
    </div>
  );
};

export default Layout;
