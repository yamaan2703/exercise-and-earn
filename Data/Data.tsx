import { Routes } from "@/routes/Routes";
import { ProductDetailTab, UserDetailTab } from "@/types/enums";
import dynamic from "next/dynamic";
import {
  FaUsers,
  FaShieldAlt,
  FaFileContract,
  FaStore,
  FaBoxOpen,
  FaUser,
  FaFire,
  FaGift,
  FaShoppingCart,
} from "react-icons/fa";
import { FaBoxArchive } from "react-icons/fa6";
import { LuNotebookText } from "react-icons/lu";
import { MdCategory, MdDashboard } from "react-icons/md";
import { BiSolidHelpCircle } from "react-icons/bi";
import { TbBrandDatabricks, TbTargetArrow } from "react-icons/tb";

export const sidebarMenu = [
  {
    label: "Dashboard",
    to: Routes.DASHBOARD,
    icon: <MdDashboard />,
  },
  {
    label: "Users",
    to: Routes.USERS,
    icon: <FaUsers />,
  },
  {
    label: "Catalog",
    icon: <FaShoppingCart />,
    to: "#",
    children: [
      {
        label: "Products",
        to: Routes.PRODUCTS,
        icon: <FaStore />,
      },
      {
        label: "Brand",
        to: Routes.BRAND,
        icon: <TbBrandDatabricks />,
      },
      {
        label: "Category",
        to: Routes.CATEGORY,
        icon: <MdCategory />,
      },
    ],
  },
  {
    label: "Milestone",
    to: Routes.MILESTONE,
    icon: <TbTargetArrow />,
  },
  {
    label: "Orders",
    to: Routes.ORDERS,
    icon: <FaBoxOpen />,
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
  {
    label: "FAQs",
    to: Routes.FAQS,
    icon: <BiSolidHelpCircle />,
  },
];

export const UserTabs = [
  {
    key: UserDetailTab.PROFILE,
    label: "Profile",
    icon: <FaUser />,
  },
  {
    key: UserDetailTab.CALORIES,
    label: "Calories",
    icon: <FaFire />,
  },
  {
    key: UserDetailTab.REWARDS,
    label: "Rewards",
    icon: <FaGift />,
  },
  {
    key: UserDetailTab.MILESTONE,
    label: "Milestone",
    icon: <TbTargetArrow />,
  },
];

export const ProductTabs = [
  {
    key: ProductDetailTab.INFO,
    label: "Information",
    icon: <LuNotebookText />,
  },
  {
    key: ProductDetailTab.STOCK,
    label: "Stock",
    icon: <FaBoxArchive />,
  },
];

export const ReactQuill = dynamic(() => import("react-quill-new"), {
  ssr: false,
});

export const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{ color: [] }, { background: [] }],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
    handlers: {
      link: function (this: any, value: boolean) {
        if (value) {
          const href = prompt("Enter the URL");
          if (href) {
            const range = this.quill.getSelection();
            if (range && range.length > 0) {
              this.quill.format("link", href);
            } else {
              this.quill.insertText(range.index, href, "link", href);
            }
          }
        } else {
          this.quill.format("link", false);
        }
      },
    },
  },
};

export const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "color",
  "background",
  "list",
  "indent",
  "align",
  "link",
  "image",
  "video",
];
