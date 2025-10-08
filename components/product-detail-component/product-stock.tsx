"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { ProductType, StockHistoryItem } from "@/types/interface";
import DynamicTable from "../ui/table";

const ProductStock = ({ product }: { product: ProductType }) => {
  const { stockHistory } = useContext(AuthContext)!;

  const filteredHistory = stockHistory.filter(
    (item) => item.productId === product.id
  );

  const columns = [
    {
      title: "Stock Changed",
      dataIndex: "stockChanged",
      key: "stockChanged",
      sorter: true,
    },
    {
      title: "Updated At",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: true,
      render: (createdAt: string) => new Date(createdAt).toLocaleDateString(),
    },
  ];
  return (
    <div>
      <div className="space-y-3 mb-4">
        <div className="bg-[#0b2d29] p-3 rounded-lg border border-teal-500/10">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-semibold">Total Stock</h3>
            <p className="text-teal-400 font-medium">{product.stock}</p>
          </div>
        </div>
      </div>

      <DynamicTable<StockHistoryItem>
        columns={columns}
        data={[...filteredHistory].reverse()}
        rowKey="productId"
      />
    </div>
  );
};

export default ProductStock;
