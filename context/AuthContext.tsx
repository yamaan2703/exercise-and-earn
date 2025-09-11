"use client";
import { createContext, useContext, useState, PropsWithChildren } from "react";

interface AuthContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  toggleSidebar: () => void;
  logoutModal: boolean;
  setLogoutModal: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <AuthContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        logoutModal,
        setLogoutModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
