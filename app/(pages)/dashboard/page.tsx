"use client";
import Card from "@/components/ui/card";
import { FaBoxOpen, FaClock, FaShoppingBag, FaUsers } from "react-icons/fa";
import { ApexOptions } from "apexcharts";
import { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { AiOutlineMenu } from "react-icons/ai";
import { ChartType, OrderStatus } from "@/types/enums";
import Loader from "@/components/ui/loader";
import Chart from "@/components/ui/chart";
import { useGetUsersQuery } from "@/redux/slices/userSlice";
import { useGetProductsQuery } from "@/redux/slices/productSlice";
import { OrderType, UserType } from "@/types/interface";
import { useGetOrdersQuery } from "@/redux/slices/orderSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

const Dashboard = () => {
  const { setIsSidebarOpen } = useContext(AuthContext)!;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { data, isLoading } = useGetUsersQuery(null);
  const { data: productData, isLoading: isProductLoading } =
    useGetProductsQuery(null);
  const { data: ordersData, isLoading: isOrderLoading } =
    useGetOrdersQuery(null);

  const users = useMemo(() => {
    return data?.users?.filter((user: UserType) => !user.isAdmin) ?? [];
  }, [data]);

  const ordersPlaced = ordersData?.orders?.filter(
    (order: OrderType) => order.status !== OrderStatus.PROCESSING
  );

  const ordersPending = ordersData?.orders?.filter(
    (order: OrderType) => order.status === OrderStatus.PROCESSING
  );

  const getDatesBetween = (start: Date, end: Date) => {
    const dates: Date[] = [];
    const cur = new Date(start);
    cur.setHours(0, 0, 0, 0);
    const last = new Date(end);
    last.setHours(0, 0, 0, 0);
    while (cur <= last) {
      dates.push(new Date(cur));
      cur.setDate(cur.getDate() + 1);
    }
    return dates;
  };

  const effectiveRange = useMemo(() => {
    if (startDate && endDate) {
      return {
        start: new Date(startDate).setHours(0, 0, 0, 0),
        end: new Date(endDate).setHours(23, 59, 59, 999),
      };
    }
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    const start = new Date();
    start.setDate(end.getDate() - 6);
    start.setHours(0, 0, 0, 0);
    return { start: start.getTime(), end: end.getTime() };
  }, [startDate, endDate]);

  const chartData = useMemo(() => {
    let dateObjects: Date[] = [];

    if (startDate && endDate) {
      dateObjects = getDatesBetween(startDate, endDate);
    } else {
      const end = new Date(effectiveRange.end);
      const start = new Date(effectiveRange.start);
      dateObjects = getDatesBetween(start, end);
    }

    const categories = dateObjects.map((d) =>
      d.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    );

    const counts = dateObjects.map((d) => {
      const dayStart = new Date(d);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(d);
      dayEnd.setHours(23, 59, 59, 999);
      const count = users.reduce((acc: number, user: UserType) => {
        if (!user.createdAt) return acc;
        const time = new Date(user.createdAt).getTime();
        if (time >= dayStart.getTime() && time <= dayEnd.getTime())
          return acc + 1;
        return acc;
      }, 0);
      return count;
    });

    return {
      series: [{ name: "User Registrations", data: counts }],
      categories,
    };
  }, [startDate, endDate, users, effectiveRange]);

  const chartApexOptions: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
      background: "transparent",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: { columnWidth: "60%", borderRadius: 6 },
    },
    dataLabels: {
      enabled: true,
      style: { fontSize: "12px", colors: ["#fff"] },
      offsetY: -15,
    },
    colors: ["#14B8A6"],
    xaxis: {
      categories: chartData.categories,
      labels: { style: { colors: "#fff", fontSize: "11px" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { style: { colors: "#fff", fontSize: "11px" } },
    },
    grid: {
      borderColor: "#374151",
      strokeDashArray: 3,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    tooltip: {
      theme: "dark",
      y: {
        formatter: function (val: number) {
          return `${val} registrations`;
        },
      },
    },
  };

  const userStats = useMemo(() => {
    if (!users || users.length === 0) {
      return { active: 0, inactive: 0 };
    }
    const activeUsers = users.filter(
      (user: UserType) => user.status === "ACTIVE"
    ).length;
    const inactiveUsers = users.length - activeUsers;
    return { active: activeUsers, inactive: inactiveUsers };
  }, [users]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".calendar-container")) {
        setIsCalendarOpen(false);
      }
    };

    if (isCalendarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCalendarOpen]);

  const clearFilter = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
          Dashboard
        </h1>
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        <Card
          title="Total Users"
          value={isLoading ? "..." : users?.length}
          Icon={FaUsers}
        />
        <Card
          title="Total Products"
          value={isProductLoading ? "..." : productData?.totalCount}
          Icon={FaShoppingBag}
        />
        <Card
          title="Orders Placed"
          value={isOrderLoading ? "..." : ordersPlaced?.length}
          Icon={FaBoxOpen}
        />
        <Card
          title="Orders Pending"
          value={isOrderLoading ? "..." : ordersPending?.length}
          Icon={FaClock}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-2 items-center">
        <div className="w-full md:w-[70%] h-full min-h-[450px] bg-[#0b2d29] rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mx-3 mb-4 mt-8">
            <h1 className="text-xl font-medium">User Registrations</h1>

            <div className="relative calendar-container">
              <div className="flex items-center gap-3">
                {startDate && endDate && (
                  <button
                    onClick={clearFilter}
                    className="text-sm text-teal-400 hover:text-teal-300 underline"
                  >
                    Clear Filter
                  </button>
                )}
                <button
                  onClick={() => setIsCalendarOpen(!isCalendarOpen)}
                  className="flex items-center gap-2 bg-[#11413a] text-white px-3 py-2 rounded-md hover:bg-teal-700/30 transition border border-teal-500/20"
                >
                  <FaCalendarAlt className="text-teal-400" />
                  <span className="text-sm">
                    {startDate && endDate
                      ? `${startDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })} - ${endDate.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}`
                      : "Select Date Range"}
                  </span>
                </button>
              </div>

              {isCalendarOpen && (
                <div className="absolute top-12 right-0 z-50">
                  <DatePicker
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update: [Date | null, Date | null]) => {
                      const [start, end] = update;
                      setStartDate(start);
                      setEndDate(end);
                      if (start && end) {
                        setIsCalendarOpen(false);
                      }
                    }}
                    inline
                    maxDate={new Date()}
                    className="rounded-lg bg-[#0b2d29]"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="p-2">
            {isLoading ? (
              <p className="flex justify-center items-center gap-2 text-xl mt-20">
                <Loader size="xl" />
              </p>
            ) : (
              <Chart
                type={ChartType.BAR}
                series={chartData.series}
                options={chartApexOptions}
                height={350}
              />
            )}
          </div>
        </div>

        <div className="w-full md:w-[30%] h-full min-h-[450px] flex flex-col justify-center items-center bg-[#0b2d29] p-2 rounded-lg shadow-md text-white">
          <h2 className="text-lg font-semibold mb-4 text-center">
            User Statistics
          </h2>
          {isLoading ? (
            <p className="flex justify-center items-center gap-2 text-xl mt-10">
              <Loader size="xl" />
            </p>
          ) : (
            <Chart
              options={
                {
                  chart: { type: "pie" },
                  labels: ["Active Users", "Inactive Users"],
                  legend: { position: "bottom", labels: { colors: "#fff" } },
                  colors: ["#14b8a6", "#9ca3af"],
                } as ApexOptions
              }
              series={[userStats.active, userStats.inactive]}
              type={ChartType.PIE}
              height={250}
              width={250}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
