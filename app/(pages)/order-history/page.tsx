"use client";
import { useState } from "react";
import { FaBoxOpen } from "react-icons/fa";

type OrderType = {
  id: string;
  product: string;
  requiredCalories: number;
  size?: string;
  color?: string;
  deliveryFee: number;
  status: "Delivered" | "Shipped" | "Processing";
  date: string;
  user: {
    name: string;
    email: string;
  };
};

const initialOrders: OrderType[] = [
  {
    id: "1",
    product: "Protein Powder",
    requiredCalories: 100,
    deliveryFee: 10,
    status: "Delivered",
    date: "2025-09-01",
    user: {
      name: "John Doe",
      email: "johndoe@example.com",
    },
  },
  {
    id: "2",
    product: "Yoga Mat",
    requiredCalories: 100,
    size: "6mm",
    color: "Blue",
    deliveryFee: 5,
    status: "Shipped",
    date: "2025-09-05",
    user: {
      name: "Emily Smith",
      email: "emily.smith@example.com",
    },
  },
  {
    id: "3",
    product: "Dumbbells Set",
    requiredCalories: 200,
    size: "15kg",
    color: "Black",
    deliveryFee: 15,
    status: "Processing",
    date: "2025-09-07",
    user: {
      name: "Michael Johnson",
      email: "michael.j@example.com",
    },
  },
  {
    id: "4",
    product: "Resistance Bands",
    requiredCalories: 100,
    color: "Green",
    deliveryFee: 4,
    status: "Delivered",
    date: "2025-09-10",
    user: {
      name: "Sophia Brown",
      email: "sophia.b@example.com",
    },
  },
  {
    id: "5",
    product: "Kettlebell",
    requiredCalories: 100,
    size: "12kg",
    color: "Gray",
    deliveryFee: 12,
    status: "Shipped",
    date: "2025-09-14",
    user: {
      name: "David Wilson",
      email: "david.w@example.com",
    },
  },
];

const OrderHistory = () => {
  const [orders, setOrders] = useState<OrderType[]>(initialOrders);

  const handleStatusChange = (id: string, newStatus: OrderType["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  return (
    <div className="p-3">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-700 after:rounded-full after:mt-1">
          Order History
        </h1>
      </div>

      {/* Orders */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-[#0d332e] p-5 rounded-xl border border-teal-500/20 shadow-md hover:bg-[#11413a] transition"
          >
            {/* Top Row */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <FaBoxOpen className="text-teal-400 text-lg" />
                <span className="font-semibold">{order.product}</span>
              </div>
              <span className="text-sm text-gray-400">{order.date}</span>
            </div>

            {/* User Details */}
            <div className="flex flex-col mb-3 text-sm text-gray-300">
              <span>
                <span className="font-medium text-teal-400">Name:</span>{" "}
                {order.user.name}
              </span>
              <span>
                <span className="font-medium text-teal-400">Email:</span>{" "}
                {order.user.email}
              </span>
              <span>
                <span className="font-medium text-teal-400">Address:</span>{" "}
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              </span>
            </div>

            {/* Order Details */}
            <div className="space-y-1 text-sm text-gray-300">
              <p>
                <span className="font-medium text-teal-400">
                  Required Calories:
                </span>{" "}
                {order.requiredCalories}
              </p>
              {order.size && (
                <p>
                  <span className="font-medium text-teal-400">Size:</span>{" "}
                  {order.size}
                </p>
              )}
              {order.color && (
                <p>
                  <span className="font-medium text-teal-400">Color:</span>{" "}
                  {order.color}
                </p>
              )}
              <p>
                <span className="font-medium text-teal-400">Delivery Fee:</span>{" "}
                ${order.deliveryFee}
              </p>

              {/* Status with Select */}
              <div className="flex items-center gap-2 mt-4">
                <p>Order Status: </p>
                <select
                  value={order.status}
                  onChange={(e) =>
                    handleStatusChange(
                      order.id,
                      e.target.value as OrderType["status"]
                    )
                  }
                  className="bg-[#0d332e] border border-teal-500/30 text-gray-200 text-sm rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-teal-500 cursor-pointer"
                >
                  <option value="Processing" className="cursor-pointer">
                    Processing
                  </option>
                  <option value="Shipped" className="cursor-pointer">
                    Shipped
                  </option>
                  <option value="Delivered" className="cursor-pointer">
                    Delivered
                  </option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
