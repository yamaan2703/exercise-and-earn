"use client";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { AiOutlineMenu } from "react-icons/ai";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import { Routes } from "@/routes/Routes";
import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
  InputSize,
  InputVariant,
  OrderStatus,
  OrderTabType,
} from "@/types/enums";
import { OrderType } from "@/types/interface";
import {
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
} from "@/redux/slices/orderSlice";
import { ColumnsType } from "antd/es/table";
import { EyeOutlined } from "@ant-design/icons";
import DynamicTable from "@/components/ui/table";
import OrderDetailModal from "@/components/ui/modal/order-detail-modal";
import toast from "react-hot-toast";

const Orders = () => {
  const { setIsSidebarOpen } = useContext(AuthContext)!;
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(OrderTabType.ORDER);
  const [orderSearch, setOrderSearch] = useState("");
  const [orderDetailModal, setOrderDetailModal] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const { data } = useGetOrdersQuery(null);
  const [updateOrderStatus] = useUpdateOrderStatusMutation();
  const orders: OrderType[] = data?.orders ?? [];

  useEffect(() => {
    if (data) console.log("Orders Data:", data);
  }, [data]);

  const handleApprove = async (orderId: number) => {
    try {
      const response = await updateOrderStatus({
        id: orderId,
        status: OrderStatus.SHIPPED,
      }).unwrap();

      toast.success("Order approved successfully!");
      console.log("Updated Order:", response);
    } catch (error) {
      console.error("Error approving order:", error);
      toast.error("Failed to approve order!");
    }
  };

  const applyFilter = (order: OrderType) => {
    const searchTerm = orderSearch.toLowerCase();
    const userMatch = order.user?.name?.toLowerCase().includes(searchTerm);
    const productMatch = order.products?.some((product) =>
      product.name.toLowerCase().includes(searchTerm)
    );
    const idMatch = order.id?.toString().includes(orderSearch);
    return userMatch || productMatch || idMatch;
  };

  const processingOrders = orders?.filter(
    (order) => order.status === OrderStatus.PROCESSING
  );

  const historyOrders = orders
    ?.filter((order) => order.status !== OrderStatus.PROCESSING)
    .filter(applyFilter);

  const columns: ColumnsType<OrderType> = [
    {
      title: "Order ID",
      dataIndex: "id",
      sorter: true,
      width: "10%",
    },
    {
      title: "Username",
      dataIndex: ["user", "name"],
      width: "15%",
      render: (_, record) => record.user?.name || "N/A",
    },
    {
      title: "Product Name",
      width: "20%",
      render: (record) => record.products?.[0]?.name || "N/A",
    },
    {
      title: "Calories",
      width: "10%",
      render: (record) => record.products?.[0]?.calories || "N/A",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: true,
      width: "15%",
      render: (date: string) =>
        date ? new Date(date).toLocaleDateString() : "N/A",
    },
    {
      title: "Status",
      dataIndex: "status",
      width: "10%",
      filters: Object.values(OrderStatus)
        .filter((status) => status !== OrderStatus.PROCESSING)
        .map((status) => ({
          text: status,
          value: status,
        })),
      render: (status: OrderStatus) => {
        const color =
          status === OrderStatus.SHIPPED ? "text-green-500" : "text-yellow-500";
        return <span className={color}>{status}</span>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: "10%",
      render: (record: OrderType) => (
        <button
          onClick={() => {
            setOrderDetailModal(true);
            setOrderId(record.id);
          }}
          title="View Order"
          className="p-1 text-white hover:text-gray-300 transition cursor-pointer"
        >
          <EyeOutlined />
        </button>
      ),
    },
  ];

  return (
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
          Orders Management
        </h1>
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>

      <div className="flex gap-2 mb-6 border-b border-teal-500/20">
        <button
          onClick={() => setActiveTab(OrderTabType.ORDER)}
          className={`px-6 py-3 font-semibold transition-all duration-300 relative ${
            activeTab === OrderTabType.ORDER
              ? "text-teal-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-500"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Orders
        </button>
        <button
          onClick={() => setActiveTab(OrderTabType.ORDERHISTORY)}
          className={`px-6 py-3 font-semibold transition-all duration-300 relative ${
            activeTab === OrderTabType.ORDERHISTORY
              ? "text-teal-400 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-teal-500"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Order History
        </button>
      </div>

      {activeTab === OrderTabType.ORDER &&
        (processingOrders && processingOrders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {processingOrders.map((order: OrderType) => (
              <div
                key={order.id}
                className="bg-[#0b2d29] text-white w-full max-w-2xl rounded-2xl shadow-2xl p-5 relative border border-teal-500/20 hover:border-teal-400 transition-all overflow-y-auto max-h-[100vh] scrollbar-hide"
              >
                <h2 className="text-xl font-semibold text-white mb-2">
                  Order Details
                </h2>

                <div className="space-y-2 text-sm mb-3">
                  <p>
                    <span className="text-white font-medium">Order ID:</span>{" "}
                    <span className="text-gray-300">#{order.id}</span>
                  </p>
                  <p>
                    <span className="text-white font-medium">User ID:</span>{" "}
                    <span
                      className="text-gray-300 cursor-pointer hover:underline"
                      onClick={() =>
                        router.push(Routes.USERS_DETAIL(order.userId))
                      }
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
                    <span className="text-white font-medium">
                      Delivery Fee:
                    </span>{" "}
                    €
                    <span className="text-gray-300">
                      {order.deliveryCharges}
                    </span>
                  </p>
                  <p>
                    <span className="text-white font-medium">
                      Total Amount:
                    </span>{" "}
                    €<span className="text-gray-300">{order.totalAmount}</span>
                  </p>
                </div>

                <div className="border-t border-teal-500/10 my-2"></div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Products</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {order.products?.length > 0 ? (
                      order.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex flex-col items-start gap-2 bg-[#12443f]/40 border border-teal-500/20 rounded-xl p-3 hover:border-teal-400/50 transition"
                        >
                          <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-[#0d3834]">
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
                              {product.description ||
                                "No description available"}
                            </p>
                            <p className="text-sm">
                              <span className="text-white">Calories:</span>{" "}
                              {product.calories}
                            </p>
                            <p className="text-sm">
                              <span className="text-white">Size:</span>{" "}
                              {product.size || "N/A"}
                            </p>
                            <p className="text-sm">
                              <span className="text-white">Specs:</span>{" "}
                              {product.specs || "N/A"}
                            </p>
                            <p className="text-sm">
                              <span className="text-white">Price:</span> €
                              {product.price}
                            </p>
                            <p className="text-sm">
                              <span className="text-white">Stock:</span>{" "}
                              {product.stock}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-400 text-sm">
                        No products in this order.
                      </p>
                    )}
                  </div>

                  <div className="border-t border-teal-500/10 my-4"></div>

                  <div className="flex justify-between items-center gap-2">
                    <Button
                      type={ButtonType.BUTTON}
                      variant={ButtonVariant.THEME}
                      size={ButtonSize.SMALL}
                      label="Approve Order"
                      onClick={() => handleApprove(order.id)}
                    />
                    <p className="text-sm text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="col-span-2 text-center py-12 text-gray-400">
            No processing orders at the moment
          </div>
        ))}

      {/* === ORDER HISTORY TAB === */}
      {activeTab === OrderTabType.ORDERHISTORY && (
        <div className="space-y-4">
          <div className="flex justify-between items-center gap-2">
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
          </div>

          <DynamicTable<OrderType>
            columns={columns}
            data={historyOrders}
            searchValue={orderSearch}
            rowKey="id"
            scroll={{ x: 800 }}
          />
        </div>
      )}

      {orderDetailModal && orderId !== null && (
        <OrderDetailModal id={orderId} modal={setOrderDetailModal} />
      )}
    </div>
  );
};

export default Orders;
