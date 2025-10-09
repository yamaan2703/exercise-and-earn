import React, { Dispatch, SetStateAction, useEffect } from "react";
import { useGetOrderByIdQuery } from "@/redux/slices/orderSlice";
import Loader from "../loader";
import { useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import { OrderType } from "@/types/interface";
import { Routes } from "@/routes/Routes";

const OrderDetailModal = ({
  id,
  modal,
}: {
  id: number;
  modal: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const { data, isLoading } = useGetOrderByIdQuery(id);
  const order: OrderType = data?.order;

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <Loader size="xl" />
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999] p-4">
      <div className="bg-[#0b2d29] text-white w-full max-w-2xl rounded-2xl shadow-2xl p-5 relative border border-teal-500/20 hover:border-teal-400 transition-all overflow-y-auto max-h-[90vh] scrollbar-hide">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Order Details</h2>
          <IoMdClose
            className="size-6 cursor-pointer hover:text-teal-400 transition"
            onClick={() => modal(false)}
          />
        </div>

        <div className="space-y-2 text-sm mb-6">
          <p>
            <span className="text-white font-medium">Order ID:</span>{" "}
            <span className="text-gray-300">#{order.id}</span>
          </p>
          <p>
            <span className="text-white font-medium">User ID:</span>{" "}
            <span
              className="text-gray-300 cursor-pointer hover:underline"
              onClick={() => router.push(Routes.USERS_DETAIL(order.userId))}
            >
              {order.userId}
            </span>
          </p>
          <p>
            <span className="text-white font-medium">Address:</span>{" "}
            <span className="text-gray-300">{order.address}</span>
          </p>
          <p>
            <span className="text-white font-medium">Status:</span>{" "}
            <span className="text-gray-300">{order.status}</span>
          </p>
          <p>
            <span className="text-white font-medium">Delivery Fee:</span> €
            <span className="text-gray-300">{order.deliveryCharges}</span>
          </p>
          <p>
            <span className="text-white font-medium">Total Amount:</span> €
            <span className="text-gray-300">{order.totalAmount}</span>
          </p>
          <p className="text-xs text-gray-400">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="border-t border-teal-500/10 my-4"></div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Products</h3>

          {order.products?.length > 0 ? (
            order.products.map((product) => (
              <div
                key={product.id}
                className="flex items-start gap-4 bg-[#12443f]/40 border border-teal-500/20 rounded-xl p-4 hover:border-teal-400/50 transition"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#0d3834]">
                  <Image
                    src={product.featuredImage}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 space-y-1 font-medium">
                  <h4
                    onClick={() =>
                      router.push(Routes.PRODUCTS_DETAIL(product.id))
                    }
                    className="text-white font-semibold text-base hover:underline cursor-pointer"
                  >
                    {product.name}
                  </h4>
                  <p className="text-sm">
                    <span className="text-white">Description:</span>{" "}
                    {product.description || "No description available"}
                  </p>
                  <p className="text-sm">
                    <span className="text-white">Calories:</span>{" "}
                    {product.calories}
                  </p>
                  <p className="text-sm">
                    <span className="text-white">Size:</span>{" "}
                    {product.sizes || "N/A"}
                  </p>
                  <p className="text-sm">
                    <span className="text-white">Specs:</span>{" "}
                    {product.specs || "N/A"}
                  </p>
                  <p className="text-sm">
                    <span className="text-white">Price:</span> €{product.price}
                  </p>
                  <p className="text-sm">
                    <span className="text-white">Stock:</span> {product.stock}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 text-sm">No products in this order.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;
