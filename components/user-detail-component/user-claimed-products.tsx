import { dummyProducts } from "@/Data/Data";
import { Routes } from "@/routes/Routes";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const UserClaimedProducts = () => {
  const router = useRouter();
  return (
    <div className="bg-[#0b2d29] rounded-xl p-4 border border-teal-500/20">
      <h2 className="text-xl font-bold text-white mb-4">Claimed Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {dummyProducts.slice(0, 6).map((product, index) => {
          return (
            <div key={index}>
              <div className="bg-[#11413a] rounded-lg border border-teal-500/10 ">
                <Image
                  src={
                    typeof product.images[0] === "string"
                      ? product.images[0]
                      : URL.createObjectURL(product.images[0])
                  }
                  alt={product.name}
                  width={80}
                  height={80}
                  className="size-12 my-1"
                />
                <h3
                  className="text-white px-3 pb-2 font-semibold cursor-pointer hover:underline"
                  onClick={() =>
                    router.push(Routes.PRODUCTS_DETAIL(product.id))
                  }
                >
                  {product.name}
                </h3>

                <div className="text-gray-300 text-sm px-3 pb-3 space-y-1">
                  <p>
                    <span className="text-gray-300">Calorie Required: </span>
                    {product.requiredCalories} cal
                  </p>
                  <p>
                    <span className="text-gray-300">Size:</span> S
                  </p>
                  <p className="text-red-500">
                    <span className="text-gray-300">Color:</span> red
                  </p>
                  <p>
                    <span className="text-gray-300">Delivery Fee:</span> ${" "}
                    {product.deliveryFee}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserClaimedProducts;
