"use client";
import Card from "@/components/ui/card";
import { FaBoxOpen, FaClock, FaShoppingBag, FaUsers } from "react-icons/fa";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { AiOutlineMenu } from "react-icons/ai";
import { cn } from "@/lib/utils";
import { ChartFilter } from "@/types/enums";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard = () => {
  const { setIsSidebarOpen } = useContext(AuthContext)!;
  const [chartFilter, setChartFilter] = useState(ChartFilter.DAILY);

  const chartDataSets = {
    [ChartFilter.DAILY]: {
      series: [{ name: "Users", data: [22, 18, 25, 8, 28, 21, 14] }],
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    [ChartFilter.WEEKLY]: {
      series: [{ name: "Users", data: [120, 140, 90, 165] }],
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    },
    [ChartFilter.MONTHLY]: {
      series: [
        {
          name: "Users",
          data: [500, 600, 450, 700, 650, 720, 800, 670, 680, 720, 400, 810],
        },
      ],
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

  const chartOptions = {
    chart: {
      type: "pie",
    },
    labels: ["Total Users", "Active Users", "Inactive Users"],
    legend: {
      position: "bottom",
    },
    colors: ["#14b8a6", "#22c55e", "#ef4444"], // teal, green, red
  };

  const chartSeries = [25, 15, 10];

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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Users" value={25} Icon={FaUsers} />
        <Card title="Total Products" value={25} Icon={FaShoppingBag} />
        <Card title="Orders Placed" value={5} Icon={FaBoxOpen} />
        <Card title="Orders Pending" value={2} Icon={FaClock} />
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mx-3 mb-4 mt-8">
        <h1 className="text-xl font-medium">
          <span className="capitalize">{chartFilter}</span> User Registrations
          2025
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
      <div className="bg-[#06211e] p-2">
        <Chart
          options={chartData.options}
          series={currentData.series}
          type="bar"
          height={350}
        />
      </div>
      {/* <div className="w-full flex flex-col items-center bg-[#06211e] p-4 rounded-lg shadow-md text-white">
        <h2 className="text-lg font-semibold mb-4 text-center">
          User Statistics
        </h2>
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="pie"
          width="100%"
        />
      </div> */}
    </div>
  );
};

export default Dashboard;
