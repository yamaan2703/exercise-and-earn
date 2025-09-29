"use client";
import React, { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { AuthContext } from "@/context/AuthContext";
import DynamicTable from "@/components/ui/table";
import { StockHistoryItem } from "@/types/interface";
import Input from "@/components/ui/input";
import { InputSize, InputVariant } from "@/types/enums";
import { FaSearch } from "react-icons/fa";
import { EyeOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";

const StockHistory = () => {
  const router = useRouter();
  const { setIsSidebarOpen, products, stockHistory } = useContext(AuthContext)!;
  const [searchStockHistory, setSearchStockHistory] = useState("");

  const handleView = (record: StockHistoryItem) => {
    const product = products.find((product) => product.id === record.productId);

    if (product) {
      router.push(Routes.PRODUCTS_DETAIL(product.id));
    }
  };

  const columns = [
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Added Stock",
      dataIndex: "addedStock",
      key: "addedStock",
      sorter: true,
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (record: StockHistoryItem) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleView(record)}
            title="View Details"
            className="p-1 text-white hover:text-gray-300 transition cursor-pointer"
          >
            <EyeOutlined />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
          Stock History
        </h1>
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>
      <div className="max-w-[400px] w-full mb-2">
        <Input
          placeholder="Search product by product name..."
          type="text"
          id="search"
          value={searchStockHistory}
          setValue={setSearchStockHistory}
          variant={InputVariant.OUTLINE}
          size={InputSize.SMALL}
          iconLeft={<FaSearch />}
        />
      </div>

      <DynamicTable<StockHistoryItem>
        columns={columns}
        data={[...stockHistory].reverse()}
        searchValue={searchStockHistory}
        searchableFields={["productName"]}
        rowKey="id"
      />
    </div>
  );
};

export default StockHistory;
