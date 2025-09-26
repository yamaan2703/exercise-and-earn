import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  ButtonSize,
  ButtonVariant,
  ChartType,
  Gender,
  InputSize,
  InputVariant,
  OrderStatus,
  StatusProduct,
  StatusUser,
} from "./enums";
import { IconType } from "react-icons/lib";
import { ApexOptions } from "apexcharts";

export interface InputProps {
  label?: string;
  value: string;
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
  connectedDevice: string;
  address: string;
}

export interface ProductType {
  id: string;
  name: string;
  images: (string | File)[];
  category: string;
  brand: string;
  description: string;
  requiredCalories: number;
  size?: string[];
  color?: string[];
  stock: number;
  price: number;
  deliveryFee: number;
  createdAt: string;
  status: StatusProduct;
}

export interface OrderType {
  product: ProductType;
  user: UserType;
  orderNumber: number;
  orderStatus: OrderStatus;
  date: string;
  paymentType: string;
}

export interface CardProps {
  title: string;
  value: string | number;
  Icon: IconType;
}

export interface FaqType {
  id: number;
  question: string;
  answer: string;
}

export interface FaqModalProps {
  label: string;
  setFaqs: Dispatch<SetStateAction<FaqType[]>>;
  setFaqModal: Dispatch<SetStateAction<boolean>>;
  question: string;
  setQuestion: Dispatch<SetStateAction<string>>;
  answer: string;
  setAnswer: Dispatch<SetStateAction<string>>;
  buttonLabel: string;
  currentFaqId: number | null;
}

export interface ChartComponentProps {
  type: ChartType;
  series: ApexOptions["series"];
  options: ApexOptions;
  height?: number | string;
  width?: number | string;
}
