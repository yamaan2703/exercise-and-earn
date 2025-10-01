import { AiOutlineLoading3Quarters } from "react-icons/ai";
import clsx from "clsx";

interface LoaderProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
}

const Loader = ({ size = "md", color }: LoaderProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-6 w-6",
    xl: "h-10 w-10",
  };

  return (
    <AiOutlineLoading3Quarters
      className={clsx("animate-spin size-6", sizeClasses[size])}
      style={{ color }}
    />
  );
};

export default Loader;
