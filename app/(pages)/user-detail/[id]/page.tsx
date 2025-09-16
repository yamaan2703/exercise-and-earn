"use client";
import { useState } from "react";
import { dummyUsers } from "@/Data/Data";
import { Status, UserDetailTab } from "@/types/enums";
import { useParams, useRouter } from "next/navigation";
import {
  FaUser,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaHeart,
  FaStar,
  FaFire,
  FaStore,
  FaBox,
} from "react-icons/fa";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";
import Image from "next/image";

const UserDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(UserDetailTab.PROFILE);

  const user = dummyUsers.find((user) => user.id === id);

  const mockFavorites = [
    {
      id: 1,
      title: "Product A",
      category: "Electronics",
      dateAdded: "2025-01-15",
    },
    {
      id: 2,
      title: "Service B",
      category: "Software",
      dateAdded: "2025-02-01",
    },
    { id: 3, title: "Product C", category: "Books", dateAdded: "2025-02-10" },
  ];

  const mockReviews = [
    {
      id: 1,
      product: "Product A",
      rating: 5,
      comment: "Excellent quality and fast delivery!",
      date: "2025-01-20",
    },
    {
      id: 2,
      product: "Product B",
      rating: 4,
      comment: "Great service, very satisfied.",
      date: "2025-02-05",
    },
    {
      id: 3,
      product: "Product C",
      rating: 3,
      comment: "Good but could be better.",
      date: "2025-02-15",
    },
  ];

  return (
    <div className="min-h-screen bg-[#06211e] p-3">
      {user ? (
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-8 mb-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="size-20 bg-white/20 rounded-full flex items-center justify-center">
                  {/* <FaUser className="text-white text-3xl" /> */}
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
                  user.status === Status.ACTIVE
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
                label: "Products",
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
                  <h2 className="text-xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                    <FaUser className="text-lg" />
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
                  <h2 className="text-xl font-bold text-teal-400 mb-4 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-lg" />
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
            <div className="bg-[#0d332e] rounded-xl p-4 border border-teal-500/20">
              <h2 className="text-xl font-bold text-teal-400 mb-6">
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
          )}

          {/* Reviews Tab Content */}
          {activeTab === UserDetailTab.PRODUCTS && (
            <div className="bg-[#0d332e] rounded-xl p-4 border border-teal-500/20">
              <h2 className="text-xl font-bold text-teal-400 mb-4">
                Redeemed Products
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
