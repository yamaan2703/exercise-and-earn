import { InputProps } from "@/types/interface";
import React from "react";

const Input = ({ value, setValue, id, type, placeholder }: InputProps) => {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-300 mb-2"
      >
        Email Address
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="appearance-none block w-full px-4 py-3 border border-green-600 placeholder-gray-400 text-white bg-[#0b140b] rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200"
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
