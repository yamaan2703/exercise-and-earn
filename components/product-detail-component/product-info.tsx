import { ProductType } from "@/types/interface";
import Image from "next/image";
import React from "react";

const ProductInfo = ({ product }: { product: ProductType }) => {
  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="bg-[#0b2d29] rounded-xl p-5 border border-teal-500/20 shadow-md">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
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
              Brand
            </p>
            <p>{product.brand}</p>
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
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="bg-[#0b2d29] flex-1 rounded-xl p-6 border border-teal-500/20 shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            Product Description
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae,
            autem! Doloremque, veniam iste. Quisquam animi magnam libero ad
            tempora incidunt. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Accusantium, velit nihil.Lorem ipsum dolor sit
            amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="bg-[#0b2d29] flex-1 rounded-xl p-6 border border-teal-500/20 shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            Product Images
          </h2>
          <div className="flex gap-3">
            <div className="bg-white/20 flex justify-center flex-1 rounded-lg">
              <Image
                src="/images/watch.png"
                alt="watch_image"
                width={150}
                height={150}
                className="size-24 sm:size-32"
              />
            </div>
            <div className="bg-white/20 flex justify-center flex-1 rounded-lg">
              <Image
                src="/images/bottle.png"
                alt="bottle_image"
                width={150}
                height={150}
                className="size-24 sm:size-32"
              />
            </div>
            <div className="bg-white/20 flex justify-center flex-1 rounded-lg">
              <Image
                src="/images/rope.png"
                alt="rope_image"
                width={150}
                height={150}
                className="size-24 sm:size-32"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
