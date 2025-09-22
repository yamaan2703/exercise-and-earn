import { ReactNode } from "react";
import {
  ButtonSize,
  ButtonVariant,
  Gender,
  InputSize,
  InputVariant,
  OrderStatus,
  StatusProduct,
  StatusUser,
} from "./enums";
import { IconType } from "react-icons/lib";

export interface InputProps {
  label?: string;
  value?: string;
  setValue: (value: string) => void;
  id: string;
  type: string;
  placeholder: string;
  variant: InputVariant;
  size: InputSize;
  required?: boolean;
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
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconType;
  fullWidth?: boolean;
  onClick?: () => void;
  externalStyles?: string;
}

export interface UserType {
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
  brand: string;
  description?: string;
  requiredCalories: number;
  size?: string[];
  color?: string[];
  stock: number;
  price: number;
  deliveryFee?: number;
  createdAt: string;
  status: StatusProduct;
}

export interface OrderType {
  product: ProductType;
  user: UserType;
  orderStatus: OrderStatus;
  date: string;
}
