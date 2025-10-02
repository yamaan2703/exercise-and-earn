import { ProductType } from "@/types/interface";
import Image from "next/image";
import React from "react";

const ProductInfo = ({ product }: { product: ProductType }) => {
  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="bg-[#0b2d29] rounded-xl p-3 sm:p-5 border border-teal-500/20 shadow-md">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          Product Information
        </h2>

        <div className="space-y-2">
          <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
            <p className="text-gray-300 font-medium flex items-center gap-2">
              Category
            </p>
            <p>{product.category.name}</p>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
            <p className="text-gray-300 font-medium flex items-center gap-2">
              Brand
            </p>
            <p>{product.brand.name}</p>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
            <p className="text-gray-300 font-medium flex items-center gap-2">
              Required Calories
            </p>
            <p>{product.calories}</p>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
            <p className="text-gray-300 font-medium flex items-center gap-2">
              Price
            </p>
            <p>{product.price}</p>
          </div>

          <div className="flex justify-between gap-2 items-center py-3 border-b border-teal-500/10">
            <p className="text-gray-300 font-medium flex items-center gap-2">
              Specifications
            </p>
            <p>{product.specs}</p>
          </div>
          {product.size && product.size.length > 0 && (
            <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
              <p className="text-gray-300 font-medium flex items-center gap-2">
                Size
              </p>
              <p className="space-x-2">{product.size}</p>
            </div>
          )}

          <div className="flex justify-between gap-2 items-center py-3 border-b border-teal-500/10">
            <p className="text-gray-300 font-medium flex items-center gap-2">
              Created At
            </p>
            <p>{product.createdAt}</p>
          </div>
          <div className="flex justify-between gap-2 items-center py-3 border-b border-teal-500/10">
            <p className="text-gray-300 font-medium flex items-center gap-2">
              Updated At
            </p>
            <p>{product.updatedAt}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="bg-[#0b2d29] flex-1 rounded-xl p-3 sm:p-6 border border-teal-500/20 shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            Product Description
          </h2>
          <p className="text-gray-300 leading-relaxed">{product.description}</p>
        </div>
        <div className="bg-[#0b2d29] flex-1 rounded-xl p-3 sm:p-6 border border-teal-500/20 shadow-md">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            Product Extra Images
          </h2>
          <div className="flex flex-wrap gap-3">
            {(() => {
              const isValidHttpUrl = (value: unknown) => {
                if (typeof value !== "string" || value.trim().length === 0)
                  return false;
                try {
                  const u = new URL(value);
                  return u.protocol === "http:" || u.protocol === "https:";
                } catch {
                  return false;
                }
              };

              const safeImages = Array.isArray(product.images)
                ? product.images.filter((img) => isValidHttpUrl(img))
                : [];

              if (safeImages.length === 0) {
                return (
                  <p className="text-gray-300 text-sm mt-6 mx-auto">
                    No extra images!
                  </p>
                );
              }

              return (
                <>
                  {safeImages.map((image, index) => (
                    <div
                      key={index}
                      className="bg-white/20 flex justify-center rounded-md"
                    >
                      <Image
                        src={image}
                        alt={`image_${index}`}
                        width={150}
                        height={150}
                        className="size-24 sm:size-32 rounded-md"
                        unoptimized
                      />
                    </div>
                  ))}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
