"use client";
import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaPlus, FaSearch } from "react-icons/fa";
import {
  ButtonVariant,
  ButtonSize,
  ButtonType,
  InputVariant,
  InputSize,
} from "@/types/enums";
import Button from "@/components/ui/button";
import { useGetBrandsQuery } from "@/redux/slices/brandSlice";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";
import Input from "@/components/ui/input";
import BrandModal from "@/components/ui/modal/brand-modal";
import { BrandItem } from "@/types/interface";

const Brands = () => {
  const { setIsSidebarOpen } = useContext(AuthContext)!;
  const router = useRouter();
  const { data, isLoading } = useGetBrandsQuery(null);
  const [addBrandModal, setAddBrandModal] = useState(false);
  const [searchBrand, setSearchBrand] = useState("");
  const brands = data?.brands ?? [];

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  const filteredBrands = brands.filter((brand: BrandItem) =>
    brand.id.toString().includes(searchBrand.trim())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <Loader size="xl" />
      </div>
    );
  }
  return (
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
          Brands
        </h1>
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>

      <div className="mb-3 flex justify-between gap-2">
        <div className="max-w-[400px] w-full">
          <Input
            placeholder="Search brand by id..."
            type="number"
            id="search"
            value={searchBrand}
            setValue={setSearchBrand}
            variant={InputVariant.OUTLINE}
            size={InputSize.SMALL}
            iconLeft={<FaSearch />}
          />
        </div>
        <Button
          type={ButtonType.BUTTON}
          label="Add Brand"
          onClick={() => setAddBrandModal(true)}
          icon={FaPlus}
          variant={ButtonVariant.THEME}
          size={ButtonSize.SMALL}
        />
      </div>

      <div className="bg-[#0b2d29] border border-teal-500/20 rounded-xl p-4">
        <h2 className="text-lg font-semibold text-white mb-4">
          Existing Brands
        </h2>
        {filteredBrands.length > 0 ? (
          <div className="space-y-4">
            {filteredBrands.map((brand: BrandItem) => (
              <div
                key={brand.id}
                className="bg-[#11413a]/40 border border-teal-500/10 rounded-lg p-4 hover:border-teal-500/30 transition-colors"
              >
                <div
                  onClick={() => router.push(Routes.BRANDID(brand.id))}
                  className="flex flex-col mb-2"
                >
                  <h3 className="text-teal-400 font-semibold text-base sm:text-lg cursor-pointer hover:underline">
                    {brand.name}
                  </h3>
                  <h3 className="font-semibold text-base sm:text-lg">
                    # {brand.id}
                  </h3>
                </div>

                {brand.products && brand.products.length > 0 ? (
                  <div>
                    <h4 className="text-gray-300 text-sm mb-2">
                      Products ({brand.products.length}):
                    </h4>
                    <div className="space-y-2">
                      {brand.products.map((product) => (
                        <div
                          key={product.id}
                          className="bg-[#06211e]/60 rounded px-3 py-2 flex justify-between items-center text-sm"
                        >
                          <p
                            onClick={() =>
                              router.push(Routes.PRODUCTS_DETAIL(product.id))
                            }
                            className="text-white hover:underline cursor-pointer"
                          >
                            {product.name}
                          </p>
                          <span className="text-gray-400">
                            {product.calories} cal
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No products assigned yet
                  </p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No brands found.</p>
        )}
      </div>

      {addBrandModal && (
        <BrandModal label="Add Brand" setAddBrandModal={setAddBrandModal} />
      )}
    </div>
  );
};

export default Brands;
