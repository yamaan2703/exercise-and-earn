import { ReactNode } from "react";

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
  logoutModal: boolean;
  setLogoutModal: (value: boolean) => void;
  title: string;
  description: string;
}

export interface ButtonProps {
  isLoading?: boolean;
  label?: string;
  variant?: "primary" | "secondary" | "danger" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  onClick?: () => void;
}
