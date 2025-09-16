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
              <span className="px-4 py-2 rounded-full text-sm font-semibold bg-white/20 text-white border border-white/30">
                ID: {product.id}
              </span>
            </div>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Info Section */}
            <div className="bg-[#0d332e] rounded-xl p-6 border border-teal-500/20 shadow-md">
              <h2 className="text-xl font-bold text-teal-400 mb-6 flex items-center gap-2">
                <FaBox className="text-lg" />
                Product Information
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
                  <span className="text-gray-300 font-medium flex items-center gap-2">
                    <FaTag className="text-teal-400" /> Category
                  </span>
                  <span className="text-white font-semibold">
                    {product.category}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
                  <span className="text-gray-300 font-medium flex items-center gap-2">
                    <FaDollarSign className="text-teal-400" /> Price
                  </span>
                  <span className="text-green-400 font-semibold">
                    ${product.price}
                  </span>
                </div>

                <div className="flex justify-between items-center py-3">
                  <span className="text-gray-300 font-medium flex items-center gap-2">
                    Stock
                  </span>
                  <span
                    className={`flex items-center gap-2 font-semibold ${
                      product.stock > 0 ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {product.stock > 0 ? (
                      <>
                        <FaCheck /> In Stock ({product.stock})
                      </>
                    ) : (
                      <>
                        <FaTimes /> Out of Stock
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Admin Actions */}
            <div className="bg-[#0d332e] rounded-xl p-6 border border-teal-500/20 shadow-md flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-teal-400 mb-3">
                  Admin Actions
                </h2>
                <p>
                  these are the actions that admin can perform. Click on any
                  which u want to do. Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Distinctio qui exercitationem commodi
                  perferendis magnam amet.
                </p>
              </div>
              <div className="flex gap-4">
                <Button
                  size="md"
                  variant="theme"
                  icon={FaEdit}
                  label="Edit Product"
                  fullWidth
                />
                <Button
                  size="md"
                  variant="danger"
                  icon={FaTrash}
                  label="Delete Product"
                  fullWidth
                />
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
