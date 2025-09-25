import clsx from "clsx";
import Loader from "./loader";
import { ButtonProps } from "@/types/interface";
import { ButtonSize, ButtonVariant } from "@/types/enums";

const Button = ({
  isLoading = false,
  label,
  variant,
  size,
  icon: Icon,
  fullWidth = false,
  onClick,
  externalStyles,
}: ButtonProps) => {
  const baseStyles =
    "group relative flex justify-center items-center font-medium rounded-lg focus:outline-none transition duration-300 transform disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles: Record<ButtonVariant, string> = {
    [ButtonVariant.PRIMARY]:
      "text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700",
    [ButtonVariant.SECONDARY]: "text-gray-800 bg-gray-200 hover:bg-gray-300",
    [ButtonVariant.DANGER]: "text-white bg-red-600 hover:bg-red-700",
    [ButtonVariant.OUTLINE]:
      "text-teal-600 border border-teal-600 hover:bg-green-50",
    [ButtonVariant.THEME]:
      "bg-teal-600 hover:bg-teal-700 rounded-lg text-white transition-all duration-200 shadow-md",
  };

  const sizeStyles: Record<ButtonSize, string> = {
    [ButtonSize.EXTRASMALL]: "px-2 py-2 text-xs",
    [ButtonSize.SMALL]: "px-3 py-2 text-sm",
    [ButtonSize.MEDIUM]: "px-4 py-2 text-base",
    [ButtonSize.LARGE]: "px-6 py-3 text-lg",
  };
  return (
    <button
      onClick={onClick}
      className={clsx(
        baseStyles,
        externalStyles,
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
