import { InputProps } from "@/types/interface";
import clsx from "clsx";
import React from "react";

const Input = ({
  label,
  value,
  setValue,
  id,
  type,
  placeholder,
  variant,
  size,
  required,
  iconLeft,
  iconRight,
}: InputProps) => {
  const baseStyles =
    "appearance-none block w-full border rounded-lg focus:outline-none transition duration-200";

  const variantStyles: Record<string, string> = {
    default:
      "bg-[#0b140b] border-green-600 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent",
    success:
      "bg-[#0b140b] border-green-600 text-green-400 placeholder-gray-400 focus:ring-2 focus:ring-green-500",
    error:
      "bg-[#0b140b] border-red-600 text-red-400 placeholder-gray-400 focus:ring-2 focus:ring-red-500",
    outline:
      "bg-transparent text-white border border-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500",
  };

  const sizeStyles: Record<string, string> = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-base",
    lg: "px-5 py-4 text-lg",
  };
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {iconLeft && (
          <span className="absolute left-3 text-gray-400">{iconLeft}</span>
        )}
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          minLength={3}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          className={clsx(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            iconLeft ? "pl-10" : "",
            iconRight ? "pr-10" : ""
          )}
        />
        {iconRight && (
          <span className="absolute right-3 text-gray-400 cursor-pointer">
            {iconRight}
          </span>
        )}
      </div>
    </div>
  );
};

export default Input;
