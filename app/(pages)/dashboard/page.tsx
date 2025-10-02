"use client";
import Card from "@/components/ui/card";
import { FaBoxOpen, FaClock, FaShoppingBag, FaUsers } from "react-icons/fa";
import { ApexOptions } from "apexcharts";
import { useContext, useMemo, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { AiOutlineMenu } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { ChartFilter, ChartType } from "@/types/enums";
import Loader from "@/components/ui/loader";
import Chart from "@/components/ui/chart";
import { useGetUsersQuery } from "@/redux/slices/userSlice";
import { useGetProductsQuery } from "@/redux/slices/productSlice";
import { UserType } from "@/types/interface";

const Dashboard = () => {
  const { setIsSidebarOpen } = useContext(AuthContext)!;
  const { data, isLoading } = useGetUsersQuery(null);
  const { data: productData, isLoading: isProductLoading } =
    useGetProductsQuery(null);
  const [chartFilter, setChartFilter] = useState(ChartFilter.DAILY);
  const users = data?.users;

  const processUserData = useMemo(() => {
    if (!users || users.length === 0) return null;

    const usersByDate: { [key: string]: number } = {};

    users.forEach((user: UserType) => {
      if (user.createdAt) {
        const date = new Date(user.createdAt);
        const dateKey = date.toISOString().split("T")[0];
        usersByDate[dateKey] = (usersByDate[dateKey] || 0) + 1;
      }
    });

    return usersByDate;
  }, [users]);

  const chartDataSets = useMemo(() => {
    if (!processUserData) {
      return {
        [ChartFilter.DAILY]: {
          series: [{ name: "Users", data: [0, 0, 0, 0, 0, 0, 0] }],
          categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        [ChartFilter.WEEKLY]: {
          series: [{ name: "Users", data: [0, 0, 0, 0] }],
          categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
        },
        [ChartFilter.MONTHLY]: {
          series: [{ name: "Users", data: Array(12).fill(0) }],
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
        },
      };
    }
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date;
    });

    const dailyData = last7Days.map((date) => {
      const dateKey = date.toISOString().split("T")[0];
      return processUserData[dateKey] || 0;
    });

    const dailyCategories = last7Days.map((date) =>
      date.toLocaleDateString("en-US", { weekday: "short" })
    );

    const weeklyData: number[] = [];
    const weeklyCategories: string[] = [];

    for (let i = 3; i >= 0; i--) {
      let count = 0;
      for (let j = 0; j < 7; j++) {
        const date = new Date();
        date.setDate(date.getDate() - (i * 7 + j));
        const dateKey = date.toISOString().split("T")[0];
        count += processUserData[dateKey] || 0;
      }
      weeklyData.push(count);
      weeklyCategories.push(`Week ${4 - i}`);
    }

    const monthlyData = Array(12).fill(0);
    const currentYear = new Date().getFullYear();

    Object.keys(processUserData).forEach((dateKey) => {
      const date = new Date(dateKey);
      if (date.getFullYear() === currentYear) {
        const month = date.getMonth();
        monthlyData[month] += processUserData[dateKey];
      }
    });

    return {
      [ChartFilter.DAILY]: {
        series: [{ name: "Users", data: dailyData }],
        categories: dailyCategories,
      },
      [ChartFilter.WEEKLY]: {
        series: [{ name: "Users", data: weeklyData }],
        categories: weeklyCategories,
      },
      [ChartFilter.MONTHLY]: {
        series: [{ name: "Users", data: monthlyData }],
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
    };
  }, [processUserData]);

  const currentData = chartDataSets[chartFilter];

  const chartData = {
    series: [
      {
        name: `${chartFilter} User Registrations`,
        data: [0, 0, 0, 0, 33, 25, 54, 81, 0, 0, 0, 0],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        background: "transparent",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "60%",
          borderRadius: 6,
          distributed: false,
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: "12px",
          colors: ["#fff"],
        },
        offsetY: -15,
      },
      colors: ["#14B8A6"],
      xaxis: {
        categories: currentData.categories,
        labels: { style: { colors: "#fff", fontSize: "11px" } },
        axisBorder: { show: false },
        axisTicks: { show: false },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff",
            fontSize: "11px",
          },
        },
        grid: {
          borderColor: "#374151",
        },
      },
      grid: {
        borderColor: "#374151",
        strokeDashArray: 3,
        yaxis: {
          lines: {
            show: true,
          },
        },
        xaxis: {
          lines: {
            show: false,
          },
        },
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: function (val: number) {
            return val + " registrations";
          },
        },
      },
    } as ApexOptions,
  };

  const userStats = useMemo(() => {
    if (!users || users.length === 0) {
      return { active: 0, inactive: 0 };
    }

    const activeUsers = users.filter((user: UserType) => {
      return user.status === "ACTIVE";
    }).length;

    const inactiveUsers = users.length - activeUsers;

    return { active: activeUsers, inactive: inactiveUsers };
  }, [users]);

  const chartOptions: ApexOptions = {
    chart: {
      type: "pie",
    },
    labels: ["Active Users", "Inactive Users"],
    legend: {
      position: "bottom",
      labels: { colors: "#fff" },
    },
    colors: ["#14b8a6", "#9ca3af"],
  };

  const chartSeries = [userStats.active, userStats.inactive];

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
          value={isLoading ? "..." : users.length}
          Icon={FaUsers}
        />
        <Card
          title="Total Products"
          value={isProductLoading ? "..." : productData.totalCount}
          Icon={FaShoppingBag}
        />
        <Card title="Orders Placed" value={6} Icon={FaBoxOpen} />
        <Card title="Orders Pending" value={4} Icon={FaClock} />
      </div>

      <div className="flex flex-col md:flex-row gap-2 items-center">
        <div className="w-full md:w-[70%] h-full min-h-[450px] bg-[#0b2d29] rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mx-3 mb-4 mt-8">
            <h1 className="text-xl font-medium">
              <span className="capitalize">{chartFilter}</span> User
              Registrations 2025
            </h1>
            <div className="flex justify-end gap-2">
              {["daily", "weekly", "monthly"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setChartFilter(filter as ChartFilter)}
                  className={cn(
                    "px-3 py-1 rounded-md text-sm cursor-pointer transition",
                    chartFilter === filter
                      ? "bg-teal-600 text-white"
                      : "bg-[#11413a] text-gray-300 hover:bg-teal-700/40 hover:text-white"
                  )}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
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
                series={currentData.series}
                options={chartData.options}
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
              options={chartOptions}
              series={chartSeries}
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
