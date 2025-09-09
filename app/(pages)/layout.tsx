import { PropsWithChildren } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex min-h-screen bg-[#122820]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Header />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
