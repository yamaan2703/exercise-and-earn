import { removeCookie } from "@/lib/cookies";
import { Routes } from "@/routes/Routes";
import { ConfirmationModalProps } from "@/types/interface";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import Button from "./ui/button";
import { AuthContext } from "@/context/AuthContext";

const ConfirmationModal = ({
  title,
  description,
  onClick,
}: ConfirmationModalProps) => {
  const { setLogoutModal } = useContext(AuthContext)!;
  const router = useRouter();

  const handleLogoutClick = () => {
    toast.success("Logged out successfully!");
    removeCookie("token");
    router.push(Routes.LOGIN);
    setLogoutModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
      <div className="bg-[#06211e] text-white w-[90%] max-w-sm rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center gap-2 mb-3">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={() => setLogoutModal(false)}
            className="text-white hover:text-gray-400  cursor-pointer"
          >
            X
          </button>
        </div>

        <p className="text-gray-300 mb-6">{description}</p>

        <div className="flex justify-end gap-3">
          <Button
            label="Cancel"
            onClick={() => setLogoutModal(false)}
            variant="secondary"
            size="xs"
          />
          <Button
            onClick={onClick}
            variant="danger"
            label="Confirm"
            size="xs"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
