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
  logoutModal: boolean;
  setLogoutModal: (value: boolean) => void;
  activeModal: boolean;
  setActiveModal: (value: boolean) => void;
  // rejectModal: boolean;
  // setRejectModal: (value: boolean) => void;
  faqModal: boolean;
  setFaqModal: (value: boolean) => void;
  orders: OrderType[];
  setOrders: Dispatch<SetStateAction<OrderType[]>>;
  products: ProductType[];
  setProducts: Dispatch<SetStateAction<ProductType[]>>;
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
  // const [rejectModal, setRejectModal] = useState(false);
  const [faqModal, setFaqModal] = useState(false);
  const [orders, setOrders] = useState(initialOrders);
  const [products, setProducts] = useState(dummyProducts);

  const handleLogoutClick = () => {
    toast.success("Logged out successfully!");
    removeCookie("token");
    router.push(Routes.LOGIN);
    setLogoutModal(false);
  };

  return (
    <AuthContext.Provider
      value={{
        adminEmail,
        adminPassword,
        isSidebarOpen,
        setIsSidebarOpen,
        logoutModal,
        setLogoutModal,
        activeModal,
        setActiveModal,
        // rejectModal,
        // setRejectModal,
        faqModal,
        setFaqModal,
        orders,
        setOrders,
        products,
        setProducts,
        handleLogoutClick,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
