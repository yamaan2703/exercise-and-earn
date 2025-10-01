import { ProductType } from "@/types/interface";
import React from "react";

const ProductStock = ({ product }: { product: ProductType }) => {
  const availableStock = Math.floor(Math.random() * product.stock);
  const usedStock = product.stock - availableStock;

  return (
    <div className="bg-[#0b2d29] rounded-xl p-3 sm:p-4 border border-teal-500/20">
      <h2 className="text-xl font-bold text-white mb-4">Product Details</h2>

      <div className="space-y-3">
        <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-semibold">Total Stock</h3>
            <p className="text-teal-400 font-medium">{product.stock}</p>
          </div>
        </div>

        <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-semibold">Available Stock</h3>
            <p className="text-teal-400 font-medium">{availableStock}</p>
          </div>
        </div>

        <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
          <div className="flex justify-between items-center">
            <h3 className="text-white font-semibold">Redeemed Stock</h3>
            <p className="text-teal-400 font-medium">{usedStock}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductStock;
