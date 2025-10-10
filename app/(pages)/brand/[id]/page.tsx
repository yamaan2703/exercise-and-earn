"use client";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaArrowLeft } from "react-icons/fa";
import { ButtonVariant, ButtonSize, ButtonType } from "@/types/enums";
import Button from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useParams, useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";
import { useGetBrandByIdQuery } from "@/redux/slices/brandSlice";
import { ProductType } from "@/types/interface";

const BrandDetail = () => {
  const { setIsSidebarOpen } = useContext(AuthContext)!;
  const router = useRouter();
  const { id } = useParams();
  const brandId = Number(id);
  const { data, isLoading } = useGetBrandByIdQuery(brandId);

  const brand = data?.brand;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <Loader size="xl" />
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[100vh] text-white">
        <p className="text-xl mb-4">Brand not found</p>
        <Button
          type={ButtonType.BUTTON}
          label="Back to Brands"
          onClick={() => router.push(Routes.BRAND)}
          variant={ButtonVariant.THEME}
          size={ButtonSize.MEDIUM}
        />
      </div>
    );
  }

  return (
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.push(Routes.BRAND)}
            className="text-white hover:text-teal-400 transition-colors"
          >
            <FaArrowLeft className="size-5 sm:size-6" />
          </button>
          <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
            Brand Details
          </h1>
        </div>
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>

      <div className="bg-[#0b2d29] border border-teal-500/20 rounded-xl p-4 sm:p-6">
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-400 mb-2">
              {brand.name}
            </h2>
            <p className="text-gray-400 text-sm">Brand ID: #{brand.id}</p>
          </div>
        </div>

        <div className="border-t border-teal-500/20 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">All Products</h3>
            <span className="text-white font-medium text-sm bg-teal-500/20 px-3 py-1 rounded-full">
              {brand.products?.length || 0} product
              {brand.products?.length !== 1 ? "s" : ""}
            </span>
          </div>

          {brand.products && brand.products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {brand.products.map((product: ProductType) => (
                <div
                  key={product.id}
                  className="bg-[#11413a]/40 border border-teal-500/10 rounded-lg p-4 hover:border-teal-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4
                      onClick={() =>
                        router.push(Routes.PRODUCTS_DETAIL(product.id))
                      }
                      className="text-white font-semibold text-base cursor-pointer hover:underline capitalize"
                    >
                      {product.name}
                    </h4>
                    <span className="text-teal-400 font-medium text-sm">
                      {product.calories} cal
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex gap-2">
                      <p className="text-gray-400">Price:</p>
                      <p className="text-white font-medium">
                        € {product.price}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <p className="text-gray-400">Stock:</p>
                      <p className="text-white font-medium">{product.stock}</p>
                    </div>

                    {product.sizes && product.sizes.length > 0 && (
                      <div className="flex gap-2">
                        <p className="text-gray-400">Sizes:</p>
                        <p className="text-white font-medium line-clamp-2">
                          {product.sizes.join(", ")}
                        </p>
                      </div>
                    )}

                    {product.colors && product.colors.length > 0 && (
                      <div className="flex gap-2">
                        <p className="text-gray-400">Colors:</p>
                        <div className="flex gap-2">
                          {product.colors.map((color, index) => (
                            <span
                              key={index}
                              className="w-4 h-4 rounded-full border border-gray-300"
                              style={{ backgroundColor: `#${color}` }}
                            ></span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <p className="text-gray-400">Specs:</p>
                      <p className="text-white font-medium">{product.specs}</p>
                    </div>

                    {product.description && (
                      <div className="flex gap-2">
                        <p className="text-gray-400">Description:</p>
                        <p className="text-white font-medium line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">
                No products associated with this brand yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandDetail;
