"use client";
import { PropsWithChildren, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const Layout = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex flex-col flex-1 min-w-0">
        <Header isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1 bg-[#f2f2f2]ss overflow-auto p-2 lg:ml-[17rem] ml-0 pt-20 transition-all duration-300">
          {children}
        </main>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Layout;

/* chat gpt theme */
/* @import "tailwindcss";

:root {
  --background: #0d1117;
  --foreground: #e6edf3;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0d1117;
    --foreground: #e6edf3;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}

.ant-table {
  background-color: #161b22 !important;
}

.ant-table-thead > tr > th {
  background-color: #21262d !important; 
  color: #f0f6fc !important;
}

.ant-table-tbody > tr > td {
  background-color: #1c2128 !important; 
  color: #c9d1d9 !important; 
}

.ant-table-tbody > tr:hover > td {
  background-color: #30363d !important; 
  color: #ffffff !important; 
}
*/

/* CLAUDE THEME */
/* @import "tailwindcss";

:root {
  --background: #0f0f23;
  --foreground: #1a1a2e;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

@media (prefers-color-scheme: dark) {
  :root {
    --background: #0f0f23;
    --foreground: #e4e4f0;
  }
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}

.ant-table {
  background-color: #0f0f23 !important;
}
.ant-table-thead > tr > th {
  background-color: #16213e !important;
  color: #e4e4f0 !important;
}
.ant-table-tbody > tr > td {
  background-color: #1a1a2e !important;
  color: #e4e4f0 !important;
}
.ant-table-tbody > tr:hover > td {
  background-color: #2d2d57 !important;
  color: #ffffff !important;
} */
