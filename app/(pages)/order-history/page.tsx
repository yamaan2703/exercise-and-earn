"use client";
import { AuthContext } from "@/context/AuthContext";
import { dummyProducts, dummyUsers } from "@/Data/Data";
import { OrderType } from "@/types/interface";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaBoxOpen } from "react-icons/fa";

export const initialOrders: OrderType[] = [
  {
    product: dummyProducts[0],
    user: dummyUsers[0],
    orderStatus: "Delivered",
    date: "2025-09-10",
  },
  {
    product: dummyProducts[1],
    user: dummyUsers[1],
    orderStatus: "Pending",
    date: "2025-09-12",
  },
  {
    product: dummyProducts[2],
    user: dummyUsers[2],
    orderStatus: "Shipped",
    date: "2025-07-16",
  },
  {
    product: dummyProducts[3],
    user: dummyUsers[3],
    orderStatus: "Delivered",
    date: "2025-08-22",
  },
  {
    product: dummyProducts[4],
    user: dummyUsers[4],
    orderStatus: "Shipped",
    date: "2025-09-01",
  },
  {
    product: dummyProducts[5],
    user: dummyUsers[5],
    orderStatus: "Pending",
    date: "2025-03-12",
  },
  {
    product: dummyProducts[6],
    user: dummyUsers[6],
    orderStatus: "Shipped",
    date: "2025-11-22",
  },
  {
    product: dummyProducts[7],
    user: dummyUsers[7],
    orderStatus: "Pending",
    date: "2025-10-16",
  },
  {
    product: dummyProducts[8],
    user: dummyUsers[8],
    orderStatus: "Delivered",
    date: "2025-05-28",
  },
  {
    product: dummyProducts[9],
    user: dummyUsers[9],
    orderStatus: "Pending",
    date: "2025-07-10",
  },
];

const OrderHistory = () => {
  const router = useRouter();
  const { orders, toggleSidebar } = useContext(AuthContext)!;

  return (
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-700 after:rounded-full after:mt-1">
          Order History
        </h1>
        <div
          onClick={() => toggleSidebar()}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>

      {/* Orders */}
      <div className="space-y-4">
        {orders
          .filter((order) => order.orderStatus !== "Pending")
          .map((order) => (
            <div
              key={order.product.id}
              className="bg-[#0d332e] p-6 rounded-xl border border-teal-500/20 shadow-lg hover:shadow-xl hover:border-teal-400 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
                <div
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() =>
                    router.push(`/product-detail/${order.product.id}`)
                  }
                >
                  <div className="p-2 bg-teal-600/20 rounded-lg">
                    <FaBoxOpen className="text-teal-400 text-xl" />
                  </div>
                  <h3 className="font-semibold text-white text-lg group-hover:underline transition">
                    {order.product.name}
                  </h3>
                </div>

                <span className="text-xs text-gray-400">{order.date}</span>
              </div>

              <div className="border-t border-teal-500/10 my-4"></div>

              {/* User + Order Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                {/* User Info */}
                <div className="space-y-1">
                  <h4 className="text-teal-400 font-semibold mb-2">
                    Customer Details
                  </h4>
                  <p className="text-gray-300">
                    <span className="text-white">Name:</span> {order.user.name}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-white">Email:</span>{" "}
                    {order.user.email}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-white">Address:</span> Lorem ipsum
                    dolor sit amet consectetur.
                  </p>
                </div>

                {/* Product Info */}
                <div className="space-y-1">
                  <h4 className="text-teal-400 font-semibold mb-2">
                    Order Details
                  </h4>
                  <p className="text-gray-300">
                    <span className="text-white">Required Calories:</span>{" "}
                    {order.product.requiredCalories}
                  </p>
                  {order.product.size && (
                    <p className="text-gray-300">
                      <span className="text-white">Size:</span>{" "}
                      {order.product.size[0]}
                    </p>
                  )}
                  {order.product.color && (
                    <p className="text-gray-300">
                      <span className="text-white">Color:</span>{" "}
                      {order.product.color[0]}
                    </p>
                  )}
                  <p className="text-gray-300">
                    <span className="text-white">Delivery Fee:</span> $
                    {order.product.deliveryFee}
                  </p>
                </div>
              </div>

              <div className="border-t border-teal-500/10 my-4"></div>

              <div className="flex gap-4 items-center">
                <p className="text-gray-300 text-sm">
                  <span className="text-white">Order Status:</span>
                </p>

                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/40">
                  {order.orderStatus}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderHistory;
