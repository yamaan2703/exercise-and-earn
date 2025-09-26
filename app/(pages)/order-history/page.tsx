"use client";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { AuthContext } from "@/context/AuthContext";
import { Routes } from "@/routes/Routes";
import {
  ButtonSize,
  ButtonVariant,
  InputSize,
  InputVariant,
  OrderStatus,
} from "@/types/enums";
import { OrderType } from "@/types/interface";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaFilter, FaSearch } from "react-icons/fa";

const OrderHistory = () => {
  const router = useRouter();
  const { orders, setIsSidebarOpen } = useContext(AuthContext)!;
  const [orderSearch, setOrderSearch] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [filterStatus, setFilterStatus] = useState<OrderStatus[]>([]);
  const filterRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleStatus = (status: OrderStatus) => {
    setFilterStatus((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  const applyFilter = (order: OrderType) => {
    const searchMatch =
      order.user.name.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.product.name.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.orderNumber.toString().includes(orderSearch);

    const statusMatch =
      filterStatus.length === 0 || filterStatus.includes(order.orderStatus);

    return searchMatch && statusMatch;
  };
  return (
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
          Order History
        </h1>
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>

      <div className="flex justify-between items-center gap-2 mb-3">
        <div className="max-w-[500px] w-full">
          <Input
            placeholder="Search by product name, username, or order number..."
            type="text"
            id="search"
            value={orderSearch}
            setValue={setOrderSearch}
            variant={InputVariant.OUTLINE}
            size={InputSize.SMALL}
            iconLeft={<FaSearch />}
          />
        </div>
        <div className="mr-4 relative" ref={filterRef}>
          <Button
            label="Filter Status"
            variant={ButtonVariant.OUTLINE}
            size={ButtonSize.SMALL}
            icon={FaFilter}
            onClick={() => setOpenFilter((prev) => !prev)}
          />
          {openFilter && (
            <div className="absolute right-0 mt-2 bg-[#0d332e] border border-teal-500/30 rounded-lg shadow-lg pl-3 pr-8 pt-2 pb-3 z-50">
              <div className="flex flex-col gap-2 text-sm text-gray-300">
                {Object.values(OrderStatus)
                  .filter((status) => status !== OrderStatus.PENDING)
                  .map((status) => (
                    <label
                      key={status}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={filterStatus.includes(status)}
                        onChange={() => toggleStatus(status)}
                        className="accent-teal-500"
                      />
                      {status}
                    </label>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders
          .filter((order) => order.orderStatus !== OrderStatus.PENDING)
          .filter(applyFilter)
          .map((order) => (
            <div
              key={order.product.id}
              className="bg-[#0d332e] p-4 rounded-xl border border-teal-500/20 shadow-lg hover:shadow-xl hover:border-teal-400 transition-all duration-300 flex flex-col"
            >
              <div className="flex justify-between items-center">
                <div
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() =>
                    router.push(Routes.PRODUCTS_DETAIL(order.product.id))
                  }
                >
                  <div className="size-12 bg-teal-600/20 rounded-lg">
                    <Image
                      src="/images/watch.png"
                      alt={order.product.name}
                      width={150}
                      height={150}
                      className="size-12 object-contains"
                    />
                  </div>
                  <div className="space-y-[2px]">
                    <h3 className="font-semibold text-white text-lg group-hover:underline transition">
                      {order.product.name}
                    </h3>
                    <p className="text-gray-300 text-xs">
                      Order Number: {order.orderNumber}
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-teal-500/10 mt-5 mb-3"></div>

              <div className="flex flex-col justify-between gap-4 text-sm mb-2">
                <div className="space-y-1">
                  <h4 className="text-teal-400 font-semibold mb-2">
                    Customer Details
                  </h4>
                  <p className="text-white">
                    Name:{" "}
                    <span
                      className="text-gray-300 cursor-pointer hover:underline"
                      onClick={() =>
                        router.push(Routes.USERS_DETAIL(order.user.id))
                      }
                    >
                      {order.user.name}
                    </span>
                  </p>
                  <p className="text-gray-300">
                    <span className="text-white">Email:</span>{" "}
                    {order.user.email}
                  </p>
                  <p className="text-gray-300 max-w-72">
                    <span className="text-white">Address:</span>
                    {order.user.address}
                  </p>
                </div>

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
                    <span className="text-white">Delivery Fee:</span> €
                    {order.product.deliveryFee}
                  </p>
                  <p className="text-gray-300">
                    <span className="text-white">Payment Type:</span>{" "}
                    {order.paymentType}
                  </p>
                </div>
              </div>

              <div className="border-t border-teal-500/10 mb-3 mt-auto"></div>

              <div className="flex justify-between gap-4 items-center">
                <div className="flex gap-2 items-center">
                  <p className="text-gray-300 text-sm">
                    <span className="text-white">Order Status:</span>
                  </p>

                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400 border border-green-500/40">
                    {order.orderStatus}
                  </span>
                </div>
                <span className="text-xs text-gray-400">{order.date}</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default OrderHistory;
