"use client";
import {
  createContext,
  useState,
  PropsWithChildren,
  Dispatch,
  SetStateAction,
} from "react";
import { OrderType, ProductType } from "@/types/interface";
import { dummyProducts, initialOrders } from "@/Data/Data";
import toast from "react-hot-toast";
import { removeCookie } from "@/lib/cookies";
import { Routes } from "@/routes/Routes";
import { useRouter } from "next/navigation";

interface AuthContextType {
  adminEmail: string;
  adminPassword: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  toggleSidebar: () => void;
  logoutModal: boolean;
  setLogoutModal: (value: boolean) => void;
  activeModal: boolean;
  setActiveModal: (value: boolean) => void;
  orders: OrderType[];
  setOrders: Dispatch<SetStateAction<OrderType[]>>;
  products: ProductType[];
  addProduct: (product: ProductType) => void;
  handleLogoutClick: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const adminEmail = "admin@gmail.com";
  const adminPassword = "123456789";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const [orders, setOrders] = useState(initialOrders);
  const [products, setProducts] = useState(dummyProducts);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleLogoutClick = () => {
    toast.success("Logged out successfully!");
    removeCookie("token");
    router.push(Routes.LOGIN);
    setLogoutModal(false);
  };

  const addProduct = (product: ProductType) => {
    setProducts((prev) => [
      ...prev,
      {
        ...product,
        id: String(prev.length + 1),
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  return (
    <AuthContext.Provider
      value={{
        adminEmail,
        adminPassword,
        isSidebarOpen,
        setIsSidebarOpen,
        toggleSidebar,
        logoutModal,
        setLogoutModal,
        activeModal,
        setActiveModal,
        orders,
        setOrders,
        products,
        addProduct,
        handleLogoutClick,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
