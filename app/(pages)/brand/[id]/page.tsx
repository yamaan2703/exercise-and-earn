"use client";
import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { ButtonVariant, ButtonSize, ButtonType } from "@/types/enums";
import Button from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useParams, useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";
import { useGetBrandByIdQuery } from "@/redux/slices/brandSlice";
import { ProductType } from "@/types/interface";
import Image from "next/image";

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
        <div className="flex justify-between items-start mb-5">
          <div className="flex-1">
            <h2 className="text-2xl sm:text-3xl font-bold text-teal-400">
              {brand.name}
            </h2>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {brand.products.map((product: ProductType) => (
                <div
                  key={product.id}
                  className="group bg-[#0f3c36] rounded-xl border border-teal-500/20 p-4 shadow-md hover:shadow-teal-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                  onClick={() =>
                    router.push(Routes.PRODUCTS_DETAIL(product.id))
                  }
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
                        <span className="text-white font-medium">Price:</span> €
                        {product.price}
                      </p>
                      <p>
                        <span className="text-white font-medium">
                          Calories:{" "}
                        </span>
                        {product.calories} cal
                      </p>
                      <p>
                        <span className="text-white font-medium">Stock:</span>{" "}
                        {product.stock}
                      </p>

                      {product.sizes && product.sizes.length > 0 && (
                        <p>
                          <span className="text-white font-medium">Sizes:</span>{" "}
                          {product.sizes.join(", ")}
                        </p>
                      )}

                      {product.colors && product.colors.length > 0 && (
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">
                            Colors:
                          </span>
                          <div className="flex gap-1">
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

                      <p>
                        <span className="text-white font-medium">Specs:</span>{" "}
                        {product.specs}
                      </p>

                      {product.description && (
                        <p className="line-clamp-2">
                          <span className="text-white font-medium">
                            Description:
                          </span>{" "}
                          {product.description}
                        </p>
                      )}
                    </div>
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
