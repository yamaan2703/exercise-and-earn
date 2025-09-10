import { Routes } from "@/routes/Routes";
import { Modal } from "antd";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const LogoutModal = ({
  logoutModal,
  setLogoutModal,
}: {
  logoutModal: boolean;
  setLogoutModal: (value: boolean) => void;
}) => {
  const router = useRouter();

  const handleLogoutClick = () => {
    toast.success("Logged out successfully!");
    localStorage.removeItem("token");
    router.push(Routes.LOGIN);
  };

  return (
    <div className=" bg-black/50 opacity-50">
      <Modal
        title="Confirm Logout"
        open={logoutModal}
        onOk={handleLogoutClick}
        onCancel={() => setLogoutModal(false)}
        okText="Confirm"
        cancelText="Cancel"
        centered
        className="bg-[#010c12] text-white rounded-lg"
      >
        <p>Are you sure you want to log out?</p>
      </Modal>
    </div>
  );
};

export default LogoutModal;
