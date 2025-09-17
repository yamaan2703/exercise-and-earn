"use client";
import { useContext, useState } from "react";
import { dummyUsers } from "@/Data/Data";
import { StatusUser, UserDetailTab } from "@/types/enums";
import { useParams, useRouter } from "next/navigation";
import { FaUser, FaArrowLeft, FaFire, FaStore } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";
import Image from "next/image";
import dynamic from "next/dynamic";
import { ApexOptions } from "apexcharts";
import { AiOutlineMenu } from "react-icons/ai";
import { AuthContext } from "@/context/AuthContext";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const UserDetailPage = () => {
  const { toggleSidebar } = useContext(AuthContext)!;
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(UserDetailTab.PROFILE);
  const [chartFilter, setChartFilter] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");

  const user = dummyUsers.find((user) => user.id === id);

  const chartDataSets = {
    daily: {
      series: [{ name: "Calories", data: [220, 180, 250, 300, 280, 260, 200] }],
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    },
    weekly: {
      series: [{ name: "Calories", data: [1200, 1400, 1100, 1800] }],
      categories: ["Week 1", "Week 2", "Week 3", "Week 4"],
    },
    monthly: {
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
      y: { formatter: (val: number) => val + " kcal" },
    },
  };

  return (
    <div className="min-h-screen p-1">
      {user ? (
        <div className="">
          <div className="flex justify-between items-center gap-2 mb-6">
            <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-700 after:rounded-full after:mt-1">
              User Detail
            </h1>
            <div
              onClick={() => toggleSidebar()}
              className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
            >
              <AiOutlineMenu className="size-5 sm:size-6" />
            </div>
          </div>
          {/* Header Section */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-8 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="size-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Image
                    src={user.photoUrl}
                    alt={user.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">
                    {user.name}
                  </h1>
                  <p className="text-teal-100 text-lg">{user.email}</p>
                </div>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  user.status === StatusUser.ACTIVE
                    ? "bg-green-500/20 text-green-300 border border-green-500"
                    : "bg-red-200 text-red-500 border border-red-500/50"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center mb-6 bg-[#0d332e] p-2 rounded-lg border border-teal-500/20">
            {[
              {
                key: UserDetailTab.PROFILE,
                label: "Profile",
                icon: <FaUser />,
              },
              {
                key: UserDetailTab.CALORIES,
                label: "Calories",
                icon: <FaFire />,
              },
              {
                key: UserDetailTab.PRODUCTS,
                label: "Claimed Products",
                icon: <FaStore />,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-300 mx-1 cursor-pointer",
                  activeTab === tab.key
                    ? "bg-teal-600 text-white shadow-md"
                    : "text-gray-300 hover:bg-teal-700/40 hover:text-white"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === UserDetailTab.PROFILE && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#0d332e] rounded-xl p-6 border border-teal-500/20">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    Profile Details
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
                      <span className="text-gray-300 font-medium">Name</span>
                      <span>{user.name}</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
                      <span className="text-gray-300 font-medium flex items-center gap-2">
                        Email
                      </span>
                      <span>{user.email}</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
                      <span className="text-gray-300 font-medium flex items-center gap-2">
                        Phone
                      </span>
                      <span>{user.phone}</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
                      <span className="text-gray-300 font-medium flex items-center gap-2">
                        Created At
                      </span>
                      <span>{user.createdAt}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0d332e] rounded-xl p-6 border border-teal-500/20">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    Extra Details
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
                      <span className="text-gray-300 font-medium">City</span>
                      <span>Karachi</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
                      <span className="text-gray-300 font-medium">Country</span>
                      <span>Pakistan</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
                      <span className="text-gray-300 font-medium">Gender</span>
                      <span>{user.gender}</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
                      <span className="text-gray-300 font-medium">
                        Birthday
                      </span>
                      <span>{user.birthday}</span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Favorites Tab Content */}
          {activeTab === UserDetailTab.CALORIES && (
            <>
              <div className="bg-[#0d332e] rounded-xl p-4 border border-teal-500/20">
                <h2 className="text-xl font-bold text-white mb-6">
                  Calories Details
                </h2>

                <div className="space-y-4">
                  <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white font-semibold">
                        Total Calories Burnt
                      </h3>
                      <p className="text-teal-400 font-medium">22,000</p>
                    </div>
                  </div>

                  <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
                    <div className="flex justify-between items-center">
                      <h3 className="text-white font-semibold">
                        Available Calories
                      </h3>
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
                        onClick={() =>
                          setChartFilter(
                            filter as "daily" | "weekly" | "monthly"
                          )
                        }
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

                {/* Chart */}
                <Chart
                  options={chartOptions}
                  series={currentData.series}
                  type="area"
                  height={350}
                />
              </div>
            </>
          )}

          {/* Reviews Tab Content */}
          {activeTab === UserDetailTab.PRODUCTS && (
            <div className="bg-[#0d332e] rounded-xl p-4 border border-teal-500/20">
              <h2 className="text-xl font-bold text-white mb-4">
                Claimed Products
              </h2>

              <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10 mb-3">
                <h3 className="text-white mb-3 font-semibold">Skipping Rope</h3>

                <div className="text-gray-300 text-sm space-y-1">
                  <p>
                    <span className="text-gray-300">Calorie Required: </span>
                    100cal
                  </p>
                  <p>
                    <span className="text-gray-300">Size:</span> S
                  </p>
                  <p className="text-red-500">
                    <span className="text-gray-300">Color:</span> red
                  </p>
                  <p>
                    <span className="text-gray-300">Delivery Fee:</span> $30
                  </p>
                </div>
              </div>
              <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
                <h3 className="text-white mb-3 font-semibold">Water Bottle</h3>

                <div className="text-gray-300 text-sm space-y-1">
                  <p>
                    <span className="text-gray-300">Calorie Required: </span>
                    100cal
                  </p>
                  <p className="text-red-500">
                    <span className="text-gray-300">Color:</span> red
                  </p>
                  <p>
                    <span className="text-gray-300">Delivery Fee:</span> $30
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center ">
          <div className="flex flex-col items-center">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-400 text-2xl font-bold mb-2">
              User not found
            </p>
            <Button
              label="Back"
              icon={FaArrowLeft}
              variant="theme"
              onClick={() => router.back()}
              size="md"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailPage;
