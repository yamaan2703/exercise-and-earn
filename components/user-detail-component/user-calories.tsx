"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { ApexOptions } from "apexcharts";
import { ChartFilter, ChartType } from "@/types/enums";
import Chart from "../ui/chart";
import { UserType } from "@/types/interface";

const UserCalories = ({ user }: { user: UserType }) => {
  const [chartFilter, setChartFilter] = useState(ChartFilter.DAILY);

  // 🔹 Dynamic chart data using API values (earnedCalories & balanceCalories)
  // replace chartDataSets with this
  const chartDataSets = {
    [ChartFilter.DAILY]: {
      series: [
        {
          name: "Earned Calories",
          data: [200, 250, 300, 220, 280, 260, user.earnedCalories],
        },
        {
          name: "Balanced Calories",
          data: [150, 180, 200, 210, 190, 230, user.balanceCalories],
        },
      ],
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    [ChartFilter.WEEKLY]: {
      series: [
        {
          name: "Earned Calories",
          data: [1000, 1200, 850, user.earnedCalories],
        },
        {
          name: "Balanced Calories",
          data: [800, 950, 750, user.balanceCalories],
        },
      ],
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    },
    [ChartFilter.MONTHLY]: {
      series: [
        {
          name: "Earned Calories",
          data: [5000, 6000, 7000, 6500, user.earnedCalories],
        },
        {
          name: "Balanced Calories",
          data: [4000, 5200, 6000, 5800, user.balanceCalories],
        },
      ],
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
    },
  };

  const currentData = chartDataSets[chartFilter];

  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
      height: 350,
      background: "transparent",
      toolbar: { show: false },
    },
    stroke: { curve: "smooth", width: 3 },
    dataLabels: {
      enabled: true,
      style: { fontSize: "12px", colors: ["#14B8A6", "#FBBF24"] },
    },
    colors: ["#14B8A6", "#FBBF24"], // earned = teal, balance = yellow
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
    legend: {
      labels: { colors: "#fff" },
    },
  };

  return (
    <>
      {/* Summary section */}
      <div className="bg-[#0b2d29] rounded-xl p-3 sm:p-4 border border-teal-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Calories Details</h2>

        <div className="space-y-3">
          <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold">Earned Calories</h3>
              <p className="text-teal-400 font-medium">{user.earnedCalories}</p>
            </div>
          </div>

          <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
            <div className="flex justify-between items-center">
              <h3 className="text-white font-semibold">Balanced Calories</h3>
              <p className="text-teal-400 font-medium">
                {user.balanceCalories}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart section */}
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
          type={ChartType.LINE}
          height={350}
        />
      </div>
    </>
  );
};

export default UserCalories;
