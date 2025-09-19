import { ProductType } from "@/types/interface";
import React from "react";
import { FaBox, FaInfoCircle } from "react-icons/fa";

const ProductInfo = ({ product }: { product: ProductType }) => {
  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="bg-[#0b2d29] rounded-xl p-5 border border-teal-500/20 shadow-md">
        <h2 className="text-xl font-bold text-teal-400 mb-4 flex items-center gap-2">
          <FaBox className="text-lg" />
          Product Information
        </h2>

        <div className="space-y-2">
          <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
            <p className="text-gray-300 font-medium flex items-center gap-2">
              Category
            </p>
            <p>{product.category}</p>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
            <p className="text-gray-300 font-medium flex items-center gap-2">
              Required Calories
            </p>
            <p>{product.requiredCalories}</p>
          </div>

          {product.size && product.size.length > 0 && (
            <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
              <p className="text-gray-300 font-medium flex items-center gap-2">
                Size
              </p>
              <p className="space-x-2">
                {product.size?.map((size, index) => (
                  <span className="space-x-2" key={index}>
                    {size}
                    {index < product.size!.length - 1 ? "," : ""}
                  </span>
                ))}
              </p>
            </div>
          )}

          {product.color && product.color.length > 0 && (
            <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
              <span className="text-gray-300 font-medium flex items-center gap-2">
                Color
              </span>
              <p className="space-x-2">
                {product.color?.map((color, index) => (
                  <span className="space-x-2" key={index}>
                    {color}
                    {index < product.color!.length - 1 ? "," : ""}
                  </span>
                ))}
              </p>
            </div>
          )}
          <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
            <p className="text-gray-300 font-medium flex items-center gap-2">
              Created At
            </p>
            <p>{product.createdAt}</p>
          </div>
        </div>
      </div>
      <div className="bg-[#0b2d29] rounded-xl p-6 border border-teal-500/20 shadow-md">
        <h2 className="text-xl font-bold text-teal-400 mb-4 flex items-center gap-2">
          <FaInfoCircle /> Product Description
        </h2>
        <p className="text-gray-300 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae, autem!
          Doloremque, veniam iste. Quisquam animi magnam libero ad tempora
          incidunt. Lorem ipsum dolor sit, amet consectetur adipisicing elit.
          Accusantium, velit nihil. Totam ad voluptate inventore? Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Et, optio accusamus!
          aliquam voluptate.
        </p>
      </div>
    </div>
  );
};

export default ProductInfo;
