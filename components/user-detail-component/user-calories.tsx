"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { ChartFilter } from "@/types/enums";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const UserCalories = () => {
  const [chartFilter, setChartFilter] = useState(ChartFilter.DAILY);

  const chartDataSets = {
    [ChartFilter.DAILY]: {
      series: [{ name: "Calories", data: [220, 180, 250, 300, 280, 260, 200] }],
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    [ChartFilter.WEEKLY]: {
      series: [{ name: "Calories", data: [1200, 1400, 1100, 1800] }],
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    },
    [ChartFilter.MONTHLY]: {
      series: [
        {
          name: "Calories",
          data: [
            5000, 6000, 4500, 7000, 6500, 7200, 8000, 7600, 6800, 7200, 7500,
            8100,
          ],
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

  const chartOptions: ApexOptions = {
    chart: {
      type: "area",
      height: 350,
      background: "transparent",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: { columnWidth: "60%", borderRadius: 6 },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: "12px",
        colors: ["#14B8A6"],
      },
      offsetY: -10,
    },
    colors: ["#14B8A6"],
    xaxis: {
      categories: currentData.categories,
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
      y: { formatter: (val: number) => val + " cal" },
    },
  };
  return (
    <>
      <div className="bg-[#0b2d29] rounded-xl p-4 border border-teal-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Calories Details</h2>

        <div className="space-y-3">
          <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold">Total Calories Burnt</h3>
              <p className="text-teal-400 font-medium">22,000</p>
            </div>
          </div>

          <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold">Available Calories</h3>
              <p className="text-teal-400 font-medium">2,000</p>
            </div>
          </div>

          <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold">
                Calories Used to Redeem Gifts
              </h3>
              <p className="text-teal-400 font-medium">20,000</p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mx-3 mb-4 mt-8">
          <h1 className="text-xl font-medium">Chart Analytics</h1>
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

        <Chart
          options={chartOptions}
          series={currentData.series}
          type="area"
          height={350}
        />
      </div>
    </>
  );
};

export default UserCalories;
