import { Dispatch, ReactNode, SetStateAction } from "react";
import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
  ChartType,
  Gender,
  InputSize,
  InputVariant,
  OrderStatus,
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
  type: ButtonType;
  isLoading?: boolean;
  label?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconType;
  fullWidth?: boolean;
  onClick?: () => void;
  externalStyles?: string;
}

export interface DeviceType {
  id: number;
  userId: string;
  deviceId: string;
  lastSync: string;
}

export interface GoalType {
  id: number;
  calories: number;
  createdAt: string;
  updatedAt: string;
}

export interface RewardType {
  id: number;
  productId: number;
  userId: string;
  achieved: false;
  achievedAt: string;
  claimed: false;
  claimedAt: string;
  unlocked: false;
  unlockedAt: string;
}

export interface UserType {
  id: string;
  name: string | null;
  gender: Gender | null;
  email: string;
  status: StatusUser;
  phone: string | null;
  createdAt: string;
  dob: string | null;
  image: string | null;
  address: string | null;
  externalId: string;
  customerId: string | null;
  isAdmin: boolean;
  allowPushNotification: boolean;
  pushToken: string | null;
  goal: GoalType | null;
  goalId: number | null;
  nextGoal: GoalType | null;
  nextGoalId: number | null;
  newGoalUnlocked: boolean;
  achievedGoals: GoalType[];
  balanceCalories: number;
  earnedCalories: number;
  device: DeviceType | null;
  rewards: RewardType[];
  updatedAt?: string;
}

export interface ProductType {
  id: number;
  name: string;
  images: string[];
  category: { id: number; name: string };
  brand: { id: number; name: string };
  description: string | null;
  calories: number;
  sizes?: string;
  colors?: string;
  specs: string;
  stock: number;
  featuredImage: string;
  goalId: number;
  brandId: number;
  categoryId: number;
  price: number;
  updatedAt: string;
  createdAt: string;
}
export interface OrderType {
  id: number;
  address: string;
  deliveryCharges: number;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  products: ProductType[];
  user: UserType;
  userId: string;
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
  setFaqModal: Dispatch<SetStateAction<boolean>>;
  question: string;
  setQuestion: Dispatch<SetStateAction<string>>;
  answer: string;
  setAnswer: Dispatch<SetStateAction<string>>;
}

export interface ChartComponentProps {
  type: ChartType;
  series: ApexOptions["series"];
  options: ApexOptions;
  height?: number | string;
  width?: number | string;
}

export interface GoalProduct {
  id: number;
  name: string;
  calories: number;
}

export interface GoalItem {
  id: number;
  calories: number;
  products: GoalProduct[];
}

export interface StockHistoryItem {
  productId: number;
  stockChanged: number;
  createdAt: string;
}

export interface BrandItem {
  id: number;
  name: string;
  products: ProductType[];
}

export interface CategoryItem {
  id: number;
  name: string;
  products: ProductType[];
}
