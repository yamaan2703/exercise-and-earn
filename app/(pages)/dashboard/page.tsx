"use client";
import Card from "@/components/ui/card";
import { FaBoxOpen, FaClock, FaShoppingBag, FaUsers } from "react-icons/fa";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { AiOutlineMenu } from "react-icons/ai";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard = () => {
  const { toggleSidebar } = useContext(AuthContext)!;
  const chartData = {
    series: [
      {
        name: "Monthly User Registrations",
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
        categories: [
          "Jan 2025",
          "Feb 2025",
          "Mar 2025",
          "Apr 2025",
          "May 2025",
          "Jun 2025",
          "Jul 2025",
          "Aug 2025",
          "Sep 2025",
          "Oct 2025",
          "Nov 2025",
          "Dec 2025",
        ],
        labels: {
          style: {
            colors: "#fff",
            fontSize: "11px",
          },
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
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
      title: {
        text: "Monthly User Registrations 2025",
        align: "center",
        style: {
          fontSize: "16px",
          color: "#fff",
          fontWeight: "bold",
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

  return (
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-700 after:rounded-full after:mt-1">
          Dashboard
        </h1>
        <div
          onClick={() => toggleSidebar()}
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

      <div className="bg-[#06211e] p-2">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
      {/* {logoutModal && (
        <ConfirmationModal
          title={"Confirm Logout"}
          description={"Are you sure you want to logout?"}
          onClick={() => handleLogoutClick()}
        />
      )} */}
    </div>
  );
};

export default Dashboard;
