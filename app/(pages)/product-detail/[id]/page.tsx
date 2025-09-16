"use client";
import { useParams, useRouter } from "next/navigation";
import { dummyProducts } from "@/Data/Data";
import {
  FaArrowLeft,
  FaBox,
  FaTag,
  FaDollarSign,
  FaCheck,
  FaTimes,
  FaEdit,
  FaTrash,
  FaInfoCircle,
} from "react-icons/fa";
import Button from "@/components/ui/button";

const ProductDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const product = dummyProducts.find((product) => product.id === id);

  return (
    <div className="min-h-screen bg-[#06211e] p-3">
      {product ? (
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-8 mb-6 relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="relative z-10 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {product.name}
                </h1>
                <p className="text-teal-100 text-lg">{product.category}</p>
              </div>
              <div className="flex flesx-col gap-2">
                <Button
                  size="sm"
                  variant="danger"
                  icon={FaTrash}
                  label="Delete"
                />
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col gap-6 mb-6">
            {/* Info Section */}
            <div className="bg-[#0d332e] rounded-xl p-5 border border-teal-500/20 shadow-md">
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
                    Delivery Fee
                  </p>
                  <p>$ {product.deliveryFee}</p>
                </div>
              </div>
            </div>
            <div className="bg-[#0d332e] rounded-xl p-6 border border-teal-500/20 shadow-md">
              <h2 className="text-xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                <FaInfoCircle /> Product Description
              </h2>
              <p className="text-gray-300 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quae,
                autem! Doloremque, veniam iste. Quisquam animi magnam libero ad
                tempora incidunt. Lorem ipsum dolor sit, amet consectetur
                adipisicing elit. Accusantium, velit nihil. Totam ad voluptate
                inventore? Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Et, optio accusamus! aliquam voluptate.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-10">
          <div className="flex flex-col items-center">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-400 text-2xl font-bold mb-2">
              Product not found
            </p>
            <Button
              label="Back"
              icon={FaArrowLeft}
              variant="theme"
              onClick={() => router.back()}
              size="md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailPage;
