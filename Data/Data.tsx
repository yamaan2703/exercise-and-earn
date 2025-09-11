import { Routes } from "@/routes/Routes";
import { FaUsers, FaShieldAlt, FaFileContract } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";

export const sidebarMenu = [
  {
    label: "Dashboard",
    to: Routes.DASHBOARD,
    icon: <MdOutlineDashboard />,
  },
  {
    label: "Users",
    to: Routes.USERS,
    icon: <FaUsers />,
  },
  {
    label: "Privacy Policy",
    to: Routes.PRIVACY_POLICY,
    icon: <FaShieldAlt />,
  },
  {
    label: "Terms & Conditions",
    to: Routes.TERMS_AND_CONDITIONS,
    icon: <FaFileContract />,
  },
];
