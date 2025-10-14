"use client";
import React, { useState, useEffect } from "react";
import { ApexOptions } from "apexcharts";
import { ChartType } from "@/types/enums";
import Chart from "../ui/chart";
import { UserType } from "@/types/interface";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";

interface CalorieDataPoint {
  date: Date;
  earnedCalories: number;
  balanceCalories: number;
}

const UserCalories = ({ user }: { user: UserType }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    if (user) console.log(user.earnedCalories, user.balanceCalories);
  }, [user]);

  const allCalorieData: CalorieDataPoint[] = [
    {
      date: new Date(2025, 8, 3),
      earnedCalories: 200,
      balanceCalories: 150,
    },
    {
      date: new Date(2025, 8, 4),
      earnedCalories: 250,
      balanceCalories: 180,
    },
    {
      date: new Date(2025, 8, 5),
      earnedCalories: 300,
      balanceCalories: 200,
    },
    {
      date: new Date(2025, 8, 6),
      earnedCalories: 220,
      balanceCalories: 210,
    },
    {
      date: new Date(2025, 8, 7),
      earnedCalories: 280,
      balanceCalories: 190,
    },
    {
      date: new Date(2025, 8, 8),
      earnedCalories: 260,
      balanceCalories: 230,
    },
    {
      date: new Date(2025, 8, 9),
      earnedCalories: 320,
      balanceCalories: 250,
    },
    {
      date: new Date(2025, 8, 10),
      earnedCalories: 290,
      balanceCalories: 240,
    },
    {
      date: new Date(2025, 8, 11),
      earnedCalories: 310,
      balanceCalories: 260,
    },
    // {
    //   date: new Date(2025, 8, 12),
    //   earnedCalories: user.earnedCalories,
    //   balanceCalories: user.balanceCalories,
    // },
  ];

  const getFilteredData = () => {
    let dataToFilter = [...allCalorieData];

    if (startDate && endDate) {
      dataToFilter = dataToFilter.filter((item) => {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0);
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        return itemDate >= start && itemDate <= end;
      });
    }

    if (dataToFilter.length === 0) {
      return {
        series: [
          { name: "Earned Calories", data: [] },
          { name: "Balanced Calories", data: [] },
        ],
        categories: [],
      };
    }

    const earnedData = dataToFilter.map((item) => item.earnedCalories);
    const balanceData = dataToFilter.map((item) => item.balanceCalories);
    const categories = dataToFilter.map((item) =>
      item.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    );

    return {
      series: [
        { name: "Earned Calories", data: earnedData },
        { name: "Balanced Calories", data: balanceData },
      ],
      categories,
    };
  };

  const filteredData = getFilteredData();

  // const getTotals = () => {
  //   if (filteredData.series[0].data.length === 0) {
  //     return { totalEarned: 0, totalBalance: 0, avgEarned: 0, avgBalance: 0 };
  //   }

  //   const totalEarned = filteredData.series[0].data.reduce(
  //     (sum, val) => sum + val,
  //     0
  //   );
  //   const totalBalance = filteredData.series[1].data.reduce(
  //     (sum, val) => sum + val,
  //     0
  //   );
  //   const count = filteredData.series[0].data.length;

  //   return {
  //     totalEarned,
  //     totalBalance,
  //     avgEarned: Math.round(totalEarned / count),
  //     avgBalance: Math.round(totalBalance / count),
  //   };
  // };

  // const totals = getTotals();

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
    colors: ["#14B8A6", "#FBBF24"],
    xaxis: {
      categories: filteredData.categories,
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
    <>
      <div className="bg-[#0b2d29] rounded-xl p-3 sm:p-4 border border-teal-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Calories Details</h2>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
            <div className="flex flex-col gap-1">
              <h3 className="text-white/80 text-sm">Earned Calories</h3>
              <p className="text-white font-bold text-2xl">
                {/* {user.earnedCalories} */} 0
              </p>
              {/* {startDate && endDate && (
                <p className="text-white/60 text-xs">
                  Total Earned: {totals.totalEarned} cal
                </p>
              )} */}
            </div>
          </div>

          <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
            <div className="flex flex-col gap-1">
              <h3 className="text-white/80 text-sm">Balanced Calories</h3>
              <p className="text-white font-bold text-2xl">
                {/* {user.balanceCalories} */} 0
              </p>
              {/* {startDate && endDate && (
                <p className="text-white/60 text-xs">
                  Total Balanced: {totals.totalBalance} cal
                </p>
              )} */}
            </div>
          </div>

          <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
            <div className="flex flex-col gap-1">
              <h3 className="text-white/80 text-sm">Redeemed Calories</h3>
              <p className="text-white font-bold text-2xl">
                0 {/* {user.balanceCalories} */}
              </p>
              {/* {startDate && endDate && (
                <p className="text-white/60 text-xs">
                  Total Balanced: {totals.totalBalance} cal
                </p>
              )} */}
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mx-3 mb-4 mt-8">
          <h1 className="text-xl font-medium">
            Chart Analytics (0-0){" "}
            {/* ({totals.avgEarned} - {totals.avgBalance}) */}
          </h1>

          <div className="relative calendar-container">
            <div className="flex items-center gap-4">
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

        {filteredData.categories.length > 0 ? (
          <Chart
            options={chartOptions}
            series={filteredData.series}
            type={ChartType.LINE}
            height={350}
          />
        ) : (
          <div className="flex items-center justify-center h-[350px] bg-[#0b2d29] rounded-lg border border-teal-500/20">
            <p className="text-white/60">
              No data available for the selected date range
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default UserCalories;
