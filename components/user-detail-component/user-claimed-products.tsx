import { dummyProducts } from "@/Data/Data";
import { Routes } from "@/routes/Routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const UserClaimedProducts = () => {
  const router = useRouter();
  return (
    <div className="bg-[#0b2d29] rounded-xl p-3 sm:p-4 border border-teal-500/20">
      <h2 className="text-xl font-bold text-white mb-4">Claimed Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {dummyProducts.slice(0, 6).map((product, index) => {
          return (
            <div
              key={index}
              className="bg-[#11413a] rounded-lg border border-teal-500/10 "
            >
              <div className="bg-white/20 m-2 w-20 flex justify-center rounded-md">
                <Image
                  src={
                    typeof product.images[0] === "string"
                      ? product.images[0]
                      : URL.createObjectURL(product.images[0])
                  }
                  alt={product.name}
                  width={80}
                  height={80}
                  className="size-12 p-1"
                />
              </div>
              <h3
                className="text-white px-3 pb-2 font-semibold cursor-pointer hover:underline"
                onClick={() => router.push(Routes.PRODUCTS_DETAIL(product.id))}
              >
                {product.name}
              </h3>

              <div className="text-gray-300 text-sm px-3 pb-3 space-y-1">
                <p className="text-gray-300">
                  <span className="text-white">Calorie Required: </span>
                  {product.requiredCalories} cal
                </p>
                {product.size && (
                  <p className="text-gray-300">
                    <span className="text-white">Size:</span>{" "}
                    {product.size?.slice(0, 1)?.map((size) => size)}
                  </p>
                )}
                {product.color && (
                  <p className="text-gray-300">
                    <span className="text-white">Color:</span>{" "}
                    {product.color?.slice(0, 1)?.map((color) => color)}
                  </p>
                )}
                <p className="text-gray-300">
                  <span className="text-white">Delivery Fee:</span> €
                  {product.deliveryFee}
                </p>
                <p className="text-gray-300">
                  <span className="text-white">Payment Type:</span> Cash
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserClaimedProducts;
