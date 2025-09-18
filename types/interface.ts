import { ReactNode } from "react";
import { Gender, StatusProduct, StatusUser } from "./enums";
import { IconType } from "react-icons/lib";

export interface InputProps {
  label?: string;
  value?: string;
  setValue: (value: string) => void;
  id: string;
  type: string;
  placeholder: string;
  variant: "default" | "success" | "error" | "outline";
  size: "sm" | "md" | "lg";
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export interface ConfirmationModalProps {
  title: string;
  description: string;
  onClick: () => void;
  onCancel: () => void;
}

export interface ButtonProps {
  isLoading?: boolean;
  label?: string;
  variant?: "primary" | "secondary" | "danger" | "outline" | "theme";
  size?: "xs" | "sm" | "md" | "lg";
  icon?: IconType;
  fullWidth?: boolean;
  onClick?: () => void;
}

export interface DataType {
  id: string;
  name: string;
  gender: Gender;
  email: string;
  status: StatusUser;
  phone: string;
  createdAt: string;
  birthday: string;
  photoUrl: string;
}

export interface ProductType {
  id: string;
  name: string;
  category: string;
  description?: string;
  requiredCalories: number;
  size?: string[];
  color?: string[];
  deliveryFee: number;
  createdAt: string;
  status: StatusProduct;
}

export interface OrderType {
  product: ProductType;
  user: DataType;
  orderStatus: "Pending" | "Delivered" | "Shipped";
  date: string;
}
