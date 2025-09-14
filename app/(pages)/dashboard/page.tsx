"use client";
import Card from "@/components/ui/card";
import { FaBoxOpen, FaFireAlt, FaGift, FaUsers } from "react-icons/fa";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const Dashboard = () => {
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
          color: "#14B8A6",
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
    <div className="p-4">
      <div className="mb-8">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-700 after:rounded-full after:mt-1">
          Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card title="Total Users" value={88} Icon={FaUsers} />
        <Card title="Calories Burnt" value={1540} Icon={FaFireAlt} />
        <Card title="Active Products" value={33} Icon={FaBoxOpen} />
        <Card title="Gifts Redeemed" value={12} Icon={FaGift} />
      </div>

      <div className="bg-[#06211e] p-2">
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
};

export default Dashboard;
