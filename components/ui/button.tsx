import clsx from "clsx";
import Loader from "./loader";
import { ButtonProps } from "@/types/interface";

const Button = ({
  isLoading = false,
  label,
  variant,
  size,
  icon: Icon,
  fullWidth = false,
  onClick,
}: ButtonProps) => {
  const baseStyles =
    "group relative flex justify-center items-center font-medium rounded-lg focus:outline-none transition duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles: Record<string, string> = {
    primary:
      "text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
    secondary: "text-gray-800 bg-gray-200 hover:bg-gray-300",
    danger: "text-white bg-red-600 hover:bg-red-700",
    outline: "text-green-600 border border-green-600 hover:bg-green-50",
    theme:
      "bg-teal-600 hover:bg-teal-700 rounded-lg text-white transition-all duration-200 shadow-md",
  };

  const sizeStyles: Record<string, string> = {
    xs: "px-2 py-2 text-xs",
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  return (
    <button
      onClick={onClick}
      className={clsx(
        baseStyles,
        variant ? variantStyles[variant] : variantStyles["primary"],
        size ? sizeStyles[size] : sizeStyles["md"],
        fullWidth ? "w-full" : "",
        !isLoading && "hover:scale-105 active:scale-95",
        "cursor-pointer"
      )}
      disabled={isLoading}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <Loader
            size={size}
            color={variant === "outline" ? "green" : "white"}
          />
          {label ? label : "Loading..."}
        </span>
      ) : (
        <span className="flex items-center gap-2">
          {Icon && <Icon />}
          {label}
        </span>
      )}
    </button>
  );
};

export default Button;
