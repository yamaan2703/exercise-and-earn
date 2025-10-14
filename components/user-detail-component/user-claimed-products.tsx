"use client";
import { UserType, RewardType, ProductType } from "@/types/interface";
import React, { useEffect, useState } from "react";
import { useLazyGetProductbyIdQuery } from "@/redux/slices/productSlice";
import Loader from "../ui/loader";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";

const UserClaimedProducts = ({ user }: { user: UserType }) => {
  const router = useRouter();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  const [getProductById] = useLazyGetProductbyIdQuery();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const results = await Promise.all(
          user.rewards.map(async (reward: RewardType) => {
            const res = await getProductById(reward.productId).unwrap();
            return res.product;
          })
        );

        setProducts(results);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user.rewards.length > 0) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [user.rewards, getProductById]);

  if (loading) {
    return (
      <div className="bg-[#0b2d29] rounded-xl p-6 border border-teal-500/20 flex items-center justify-center h-40">
        <Loader size="xl" />
      </div>
    );
  }

  return (
    <div className="bg-[#0b2d29] rounded-xl p-6 border border-teal-500/20">
      <h2 className="text-xl font-bold text-white mb-5">Rewards</h2>

      {user.rewards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {user.rewards.map((reward: RewardType, index) => {
            const product = products[index];

            if (!product)
              return (
                <div
                  key={reward.id}
                  className="bg-[#11413a]/50 rounded-lg border border-red-500/20 p-5 text-center text-red-400"
                >
                  Product not found
                </div>
              );

            return (
              <div
                key={reward.id}
                className="group bg-[#0f3c36] rounded-xl border border-teal-500/20 p-4 shadow-md hover:shadow-teal-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                onClick={() => router.push(Routes.PRODUCTS_DETAIL(product.id))}
              >
                <div className="flex flex-col space-y-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden ring-2 ring-teal-500/30 group-hover:ring-teal-400/60 transition-all">
                    <Image
                      src={product.featuredImage}
                      alt={product.name}
                      fill
                      className="object-cover p-2"
                    />
                  </div>

                  <h3 className="text-lg capitalize font-semibold text-white group-hover:text-teal-400 transition-colors">
                    {product.name}
                  </h3>

                  <div className="w-full border-t border-teal-500/10 my-1"></div>

                  <div className="text-sm text-gray-300 w-full space-y-1 text-left">
                    <p>
                      <span className="text-white font-medium">Brand:</span>{" "}
                      {product.brand.name}
                    </p>
                    <p>
                      <span className="text-white font-medium">Category:</span>{" "}
                      {product.category.name}
                    </p>
                    <p>
                      <span className="text-white font-medium">Calories:</span>{" "}
                      {product.calories}
                    </p>

                    <p>
                      <span className="text-white font-medium">Specs:</span>{" "}
                      {product.specs}
                    </p>
                    {reward.claimedAt && (
                      <p>
                        <span className="text-white font-medium">
                          Claimed At:
                        </span>{" "}
                        {new Date(reward.claimedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-2 text-gray-400 italic text-sm">No rewards yet!</p>
      )}
    </div>
  );
};

export default UserClaimedProducts;
