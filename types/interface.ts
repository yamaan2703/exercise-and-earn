import { ReactNode } from "react";
import { Gender, Status } from "./enums";

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
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "xs" | "sm" | "md" | "lg";
  fullWidth?: boolean;
  onClick?: () => void;
}

export interface DataType {
  name: string;
  gender: Gender;
  email: string;
  id: string;
  status: Status;
}
