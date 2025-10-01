"use client";
import { useParams, useRouter } from "next/navigation";
import { ProductTabs } from "@/Data/Data";
import { FaArrowLeft } from "react-icons/fa";
import Button from "@/components/ui/button";
import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
  ProductDetailTab,
} from "@/types/enums";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import ProductInfo from "@/components/product-detail-component/product-info";
import ProductStock from "@/components/product-detail-component/product-stock";
import toast from "react-hot-toast";
import { useGetProductbyIdQuery } from "@/redux/slices/productSlice";
import Loader from "@/components/ui/loader";

const ProductDetailPage = () => {
  const { setIsSidebarOpen } = useContext(AuthContext)!;
  const [activeTab, setActiveTab] = useState(ProductDetailTab.INFO);
  const { id } = useParams();
  const router = useRouter();
  const { data, isLoading } = useGetProductbyIdQuery(Number(id));
  const product = data?.product;

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  useEffect(() => {
    if (product?.availableStock !== undefined && product.availableStock <= 5) {
      toast.error(`Only ${product.availableStock} stock left. Hurry up!`);
    }
  }, [product?.availableStock]);

  if (isLoading)
    return (
      <p className="flex justify-center items-center min-h-[100vh]">
        <Loader size="xl" />
      </p>
    );
  return (
    <div className="min-h-screen p-1">
      {product ? (
        <div className="">
          <div className="flex justify-between items-center gap-2 mb-6">
            <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
              Product Detail
            </h1>
            <div
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
            >
              <AiOutlineMenu className="size-5 sm:size-6" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-8 mb-3 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="bg-white/20 rounded-full">
                  {(() => {
                    const isValidHttpUrl = (value: unknown) => {
                      if (
                        typeof value !== "string" ||
                        value.trim().length === 0
                      )
                        return false;
                      try {
                        // Allow only http/https absolute URLs
                        const u = new URL(value);
                        return (
                          u.protocol === "http:" || u.protocol === "https:"
                        );
                      } catch {
                        return false;
                      }
                    };

                    const src = isValidHttpUrl(product.featuredImage)
                      ? (product.featuredImage as string)
                      : "/images/bottle.png";

                    return (
                      <Image
                        src={src}
                        alt={product.name}
                        width={150}
                        height={150}
                        className="size-24 sm:size-28 rounded-full"
                        unoptimized
                      />
                    );
                  })()}
                </div>
                <div className="flex flex-col items-center sm:items-start">
                  <h1 className="text-3xl font-bold text-white mb-1">
                    {product.name}
                  </h1>
                  <p className="text-teal-100 text-lg">
                    {product.category.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 mb-4 bg-[#0d332e] p-2 rounded-lg border border-teal-500/20">
            {ProductTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer",
                  activeTab === tab.key
                    ? "bg-teal-600 text-white shadow-md"
                    : "text-gray-300 hover:bg-teal-700/40 hover:text-white"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === ProductDetailTab.INFO && (
            <ProductInfo product={product} />
          )}
          {activeTab === ProductDetailTab.STOCK && (
            <ProductStock product={product} />
          )}
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <div className="flex flex-col items-center">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-400 text-2xl font-bold mb-2">
              Product not found
            </p>
            <Button
              type={ButtonType.BUTTON}
              label="Back"
              icon={FaArrowLeft}
              variant={ButtonVariant.THEME}
              onClick={() => router.back()}
              size={ButtonSize.MEDIUM}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
