import { AiOutlineLoading3Quarters } from "react-icons/ai";
import clsx from "clsx";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

const Loader = ({ size = "md", color }: LoaderProps) => {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-6 w-6",
  };

  return (
    <AiOutlineLoading3Quarters
      className={clsx("animate-spin size-4", sizeClasses[size])}
      style={{ color }}
    />
  );
};

export default Loader;
