import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Button = ({
  isLoading,
  label,
}: {
  isLoading: boolean;
  label: string;
}) => {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition duration-300 transform hover:scale-105 cursor-pointer"
    >
      {isLoading ? (
        <span className="flex items-center">
          <AiOutlineLoading3Quarters className="animate-spin -ml-1 mr-2 h-4 w-4 " />
          Signing in...
        </span>
      ) : (
        label
      )}
    </button>
  );
};

export default Button;
