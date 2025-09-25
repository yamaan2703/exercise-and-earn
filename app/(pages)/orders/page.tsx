"use client";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import { AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import { Routes } from "@/routes/Routes";
import { ButtonSize, ButtonVariant, OrderStatus } from "@/types/enums";

const Orders = () => {
  const { orders, setOrders, setIsSidebarOpen } = useContext(AuthContext)!;
  const router = useRouter();
  // const [orderToReject, setOrderToReject] = useState<string | null>(null);

  const handleApprove = (id: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.product.id === id
          ? { ...order, orderStatus: OrderStatus.SHIPPED }
          : order
      )
    );
  };

  // const handleReject = (id: string) => {
  //   setOrders((prev) => prev.filter((order) => order.product.id !== id));
  // };

  // const openRejectModal = (orderId: string) => {
  //   setOrderToReject(orderId);
  //   setRejectModal(true);
  // };

  // const confirmReject = () => {
  //   if (orderToReject) {
  //     handleReject(orderToReject);
  //   }
  //   setRejectModal(false);
  //   setOrderToReject(null);
  // };

  // const cancelReject = () => {
  //   setRejectModal(false);
  //   setOrderToReject(null);
  // };

  return (
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
          Orders
        </h1>
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders
          .filter((order) => order.orderStatus === OrderStatus.PENDING)
          .map((order) => (
            <div
              key={order.product.id}
              className="bg-[#0d332e] relative p-6 rounded-xl border border-teal-500/20 shadow-lg hover:shadow-xl hover:border-teal-400 transition-all duration-300"
            >
              <div className="flex justify-between items-center mb-4">
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

                <span className="text-xs text-gray-400">{order.date}</span>
              </div>

              <div className="border-t border-teal-500/10 my-4"></div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 text-sm">
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
                    <span className="text-white ">Address:</span>{" "}
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

              <div className="border-t border-teal-500/10 my-4"></div>

              <div className="flex gap-4 items-center">
                <Button
                  variant={ButtonVariant.THEME}
                  size={ButtonSize.SMALL}
                  label="Approve Order"
                  onClick={() => handleApprove(order.product.id)}
                />
                {/* <Button
                  variant={ButtonVariant.DANGER}
                  size={ButtonSize.SMALL}
                  label="Reject Order"
                  onClick={() => openRejectModal(order.product.id)}
                /> */}
              </div>
            </div>
          ))}
      </div>

      {/* {rejectModal && (
        <ConfirmationModal
          title={"Confirm Reject Order"}
          description={"Are you sure you want to reject this order?"}
          onClick={confirmReject}
          onCancel={cancelReject}
        />
      )} */}
    </div>
  );
};

export default Orders;
