"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { FaBoxOpen } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { AiOutlineMenu } from "react-icons/ai";

const Orders = () => {
  const { orders, setOrders, toggleSidebar } = useContext(AuthContext)!;
  const router = useRouter();

  const handleApprove = (id: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.product.id === id ? { ...o, orderStatus: "Shipped" } : o
      )
    );
  };

  const handleReject = (id: string) => {
    setOrders((prev) => prev.filter((o) => o.product.id !== id));
  };
  return (
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-700 after:rounded-full after:mt-1">
          Orders
        </h1>
        <div
          onClick={() => toggleSidebar()}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>
      <div className="space-y-4">
        {orders
          .filter((order) => order.orderStatus === "Pending")
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
                <Button
                  variant="theme"
                  size="sm"
                  label="Approve Order"
                  onClick={() => handleApprove(order.product.id)}
                />
                <Button
                  variant="danger"
                  size="sm"
                  label="Reject Order"
                  onClick={() => handleReject(order.product.id)}
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Orders;
