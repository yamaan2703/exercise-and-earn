import { ReactNode } from "react";
import { Gender, Status } from "./enums";
import { IconType } from "react-icons/lib";

export interface InputProps {
  label?: string;
  value: string;
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
  status: Status;
}

export interface ProductType {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

export interface GiftType {
  id: string;
  name: string;
  type: string;
  points: number;
}
