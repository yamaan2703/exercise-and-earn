"use client";
import {
  createContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { ProductType, StockHistoryItem } from "@/types/interface";
import toast from "react-hot-toast";
import { removeCookie } from "@/lib/cookies";
import { Routes } from "@/routes/Routes";
import { useRouter } from "next/navigation";

interface AuthContextType {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  logoutModal: boolean;
  setLogoutModal: (value: boolean) => void;
  activeModal: boolean;
  setActiveModal: (value: boolean) => void;
  stockHistory: StockHistoryItem[];
  setStockHistory: Dispatch<SetStateAction<StockHistoryItem[]>>;
  handleLogoutClick: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [stockHistory, setStockHistory] = useState<StockHistoryItem[]>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("stockHistory");
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("stockHistory", JSON.stringify(stockHistory));
  }, [stockHistory]);

  const handleLogoutClick = () => {
    toast.success("Logged out successfully!");
    removeCookie("token");
    router.push(Routes.LOGIN);
    setLogoutModal(false);
    setIsSidebarOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        logoutModal,
        setLogoutModal,
        activeModal,
        setActiveModal,
        stockHistory,
        setStockHistory,
        handleLogoutClick,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
