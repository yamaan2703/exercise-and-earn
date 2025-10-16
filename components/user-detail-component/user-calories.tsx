"use client";
import React, { useState, useEffect, useMemo } from "react";
import { ApexOptions } from "apexcharts";
import { ChartType } from "@/types/enums";
import Chart from "../ui/chart";
import { UserCaloriesItem, UserType } from "@/types/interface";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { useGetUserCaloriesByIdQuery } from "@/redux/slices/caloriesSlice";
import Loader from "../ui/loader";

const UserCalories = ({ user }: { user: UserType }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { data, isLoading } = useGetUserCaloriesByIdQuery(user.id);

  const calories: UserCaloriesItem[] = useMemo(
    () => data?.calories || [],
    [data]
  );

  const totalEarned =
    calories?.reduce(
      (acc: number, curr: UserCaloriesItem) => acc + curr.earned,
      0
    ) || 0;
  const totalRedeemed =
    calories?.reduce(
      (acc: number, curr: UserCaloriesItem) => acc + curr.redeemed,
      0
    ) || 0;

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

  const filteredCalories = useMemo(() => {
    if (!calories || calories.length === 0) return [];

    return calories.filter((item: UserCaloriesItem) => {
      const itemDate = new Date(item.date).getTime();
      return itemDate >= effectiveRange.start && itemDate <= effectiveRange.end;
    });
  }, [calories, effectiveRange]);

  const dailyTotals = useMemo(() => {
    const map = new Map<string, { earned: number; redeemed: number }>();

    filteredCalories.forEach((item: UserCaloriesItem) => {
      const dateKey = new Date(item.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      if (!map.has(dateKey)) {
        map.set(dateKey, { earned: 0, redeemed: 0 });
      }
      const current = map.get(dateKey)!;
      map.set(dateKey, {
        earned: current.earned + item.earned,
        redeemed: current.redeemed + item.redeemed,
      });
    });

    const categories = Array.from(map.keys());
    const earnedData = Array.from(map.values()).map((value) => value.earned);
    const redeemedData = Array.from(map.values()).map(
      (value) => value.redeemed
    );

    return { categories, earnedData, redeemedData };
  }, [filteredCalories]);

  const totalFilteredEarned =
    dailyTotals.earnedData?.reduce((a, b) => a + b, 0) || 0;
  const totalFilteredRedeemed =
    dailyTotals.redeemedData?.reduce((a, b) => a + b, 0) || 0;

  const chartOptions: ApexOptions = {
    chart: {
      type: "line",
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
      categories: dailyTotals.categories,
      labels: { style: { colors: "#fff", fontSize: "11px" } },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { labels: { style: { colors: "#fff", fontSize: "11px" } } },
    grid: {
      borderColor: "#374151",
      strokeDashArray: 3,
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    tooltip: { theme: "dark", y: { formatter: (val: number) => val + " cal" } },
    legend: { labels: { colors: "#fff" } },
  };

  const clearFilter = () => {
    setStartDate(null);
    setEndDate(null);
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
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isCalendarOpen]);

  return (
    <>
      <div className="bg-[#0b2d29] rounded-xl p-4 border border-teal-500/20">
        <h2 className="text-xl font-bold text-white mb-4">Calories Overview</h2>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
            <h3 className="text-white/80 text-sm">Total Earned</h3>
            <p className="text-white font-bold text-2xl">{totalEarned}</p>
          </div>

          <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
            <h3 className="text-white/80 text-sm">Total Redeemed</h3>
            <p className="text-white font-bold text-2xl">{totalRedeemed}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mx-3 mb-4 mt-8">
          <div className="flex gap-2">
            <h1 className="text-xl font-medium text-white">Chart Analytics</h1>

            <div className="text-lg">
              (Earned:{" "}
              <span className="font-semibold">{totalFilteredEarned}</span>,
              Redeemed:{" "}
              <span className="font-semibold">{totalFilteredRedeemed}</span>)
            </div>
          </div>

          <div className="relative calendar-container">
            <div className="flex items-center gap-2">
              {startDate && endDate && (
                <button
                  onClick={clearFilter}
                  className="text-teal-400 hover:text-teal-300"
                >
                  <MdCancel className="size-5" />
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
                    if (start && end) setIsCalendarOpen(false);
                  }}
                  inline
                  maxDate={new Date()}
                  className="rounded-lg bg-[#0b2d29]"
                />
              </div>
            )}
          </div>
        </div>

        {isLoading ? (
          <p className="flex justify-center items-center gap-2 text-xl mt-20">
            <Loader size="xl" />
          </p>
        ) : dailyTotals.categories.length > 0 ? (
          <Chart
            options={chartOptions}
            series={[
              { name: "Earned Calories", data: dailyTotals.earnedData },
              { name: "Redeemed Calories", data: dailyTotals.redeemedData },
            ]}
            type={ChartType.LINE}
            height={350}
          />
        ) : (
          <div className="flex items-center justify-center h-[350px] bg-[#0b2d29] rounded-lg border border-teal-500/20">
            <p className="text-white/60">No data available.</p>
          </div>
        )}
      </div>
    </>
  );
};

export default UserCalories;
