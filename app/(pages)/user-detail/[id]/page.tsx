"use client";
import { useState } from "react";
import { dummyUsers } from "@/Data/Data";
import { Routes } from "@/routes/Routes";
import { Status } from "@/types/enums";
import { useParams, useRouter } from "next/navigation";
import {
  FaEnvelope,
  FaToggleOn,
  FaUser,
  FaVenusMars,
  FaArrowLeft,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaBell,
  FaCrown,
  FaCreditCard,
  FaHistory,
  FaDollarSign,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import { cn } from "@/lib/utils";

const UserDetailPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");

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
                  <FaUser className="text-white text-3xl" />
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
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "bg-red-200 text-red-500 border border-red-500/30"
                }`}
              >
                {user.status}
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center gap-4 mb-6 border-b border-teal-500/20">
            <button
              onClick={() => setActiveTab("profile")}
              className={cn(
                "px-4 py-2 cursor-pointer transition-all duration-200",
                activeTab === "profile"
                  ? "text-teal-400 bg-teal-500/10 border-b-2 border-teal-400"
                  : "text-teal-500 hover:text-teal-400 hover:bg-teal-500/5"
              )}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab("favorites")}
              className={cn(
                "px-4 py-2 cursor-pointer transition-all duration-200 ",
                activeTab === "favorites"
                  ? "text-teal-400 bg-teal-500/10 border-b-2 border-teal-400"
                  : "text-teal-500 hover:text-teal-400 hover:bg-teal-500/5"
              )}
            >
              Favorites
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={cn(
                "px-4 py-2 cursor-pointer transition-all duration-200",
                activeTab === "reviews"
                  ? "text-teal-400 bg-teal-500/10 border-b-2 border-teal-400"
                  : "text-teal-500 hover:text-teal-400 hover:bg-teal-500/5"
              )}
            >
              Reviews
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === "profile" && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#0d332e] rounded-xl p-6 border border-teal-500/20">
                  <h2 className="text-xl font-bold text-teal-400 mb-6 flex items-center gap-2">
                    <FaUser className="text-lg" />
                    Profile Details
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
                      <span className="text-gray-300 font-medium">Name</span>
                      <span className="text-white font-semibold">
                        {user.name}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
                      <span className="text-gray-300 font-medium flex items-center gap-2">
                        Email
                      </span>
                      <span className="text-white font-semibold">
                        {user.email}
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
                      <span className="text-gray-300 font-medium flex items-center gap-2">
                        Newsletter
                      </span>
                      <span className="text-green-400 font-semibold">
                        Subscribed
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-300 font-medium flex items-center gap-2">
                        Joined Date
                      </span>
                      <span className="text-white font-semibold">
                        Aug 27, 2025
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0d332e] rounded-xl p-6 border border-teal-500/20">
                  <h2 className="text-xl font-bold text-teal-400 mb-6 flex items-center gap-2">
                    <FaMapMarkerAlt className="text-lg" />
                    Location Details
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
                      <span className="text-gray-300 font-medium">City</span>
                      <span className="text-white font-semibold">Karachi</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
                      <span className="text-gray-300 font-medium">Country</span>
                      <span className="text-white font-semibold">Pakistan</span>
                    </div>

                    <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
                      <span className="text-gray-300 font-medium">
                        Latitude
                      </span>
                      <span className="text-white font-semibold font-mono text-sm">
                        24.8339376
                      </span>
                    </div>

                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-300 font-medium">
                        Longitude
                      </span>
                      <span className="text-white font-semibold font-mono text-sm">
                        67.0022785
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#0d332e] rounded-xl p-6 border border-teal-500/20">
                <h2 className="text-xl font-bold text-teal-400 mb-6 flex items-center gap-2">
                  <FaCrown className="text-lg" />
                  Subscription Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
                    <div className="flex items-center gap-3 mb-2">
                      <FaCrown className="text-teal-400 hidden sm:block" />
                      <span className="text-gray-300 font-medium">Premium</span>
                    </div>
                    <span className="text-red-400 font-semibold">
                      Not Subscribed
                    </span>
                  </div>

                  <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
                    <div className="flex items-center gap-3 mb-2">
                      <FaCreditCard className="text-teal-400 hidden sm:block" />
                      <span className="text-gray-300 font-medium">
                        Subscription Type
                      </span>
                    </div>
                    <span className="text-gray-400 font-semibold">
                      Not provided
                    </span>
                  </div>

                  <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
                    <div className="flex items-center gap-3 mb-2">
                      <FaCalendarAlt className="text-teal-400 hidden sm:block" />
                      <span className="text-gray-300 font-medium">
                        Subscription Expiry
                      </span>
                    </div>
                    <span className="text-gray-400 font-semibold">
                      Not provided
                    </span>
                  </div>

                  <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
                    <div className="flex items-center gap-3 mb-2">
                      <FaHistory className="text-teal-400 hidden sm:block" />
                      <span className="text-gray-300 font-medium">
                        Last Purchase Date
                      </span>
                    </div>
                    <span className="text-gray-400 font-semibold">
                      Not provided
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-teal-500/10">
                  <div className="bg-gradient-to-r from-teal-500/10 to-teal-600/10 p-4 rounded-lg border border-teal-500/20">
                    <div className="flex items-center gap-3">
                      <FaDollarSign className="text-teal-400 text-lg" />
                      <span className="text-gray-300 font-medium">
                        Revenue Generated
                      </span>
                      <span className="text-gray-400 font-semibold ml-auto">
                        Not provided
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Favorites Tab Content */}
          {activeTab === "favorites" && (
            <div className="bg-[#0d332e] rounded-xl p-6 border border-teal-500/20">
              <h2 className="text-xl font-bold text-teal-400 mb-6">
                Favorite Items
              </h2>

              {mockFavorites.length > 0 ? (
                <div className="space-y-4">
                  {mockFavorites.map((favorite) => (
                    <div
                      key={favorite.id}
                      className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-white font-semibold mb-1">
                            {favorite.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-2">
                            {favorite.category}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-300 text-xs">Added on</p>
                          <p className="text-teal-400 text-sm font-medium">
                            {favorite.dateAdded}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaHeart className="text-gray-500 text-4xl mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No favorites yet</p>
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab Content */}
          {activeTab === "reviews" && (
            <div className="bg-[#0d332e] rounded-xl p-6 border border-teal-500/20">
              <h2 className="text-xl font-bold text-teal-400 mb-6">
                User Reviews
              </h2>

              {mockReviews.length > 0 ? (
                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-white font-semibold">
                            {review.product}
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={cn(
                                  "text-sm",
                                  i < review.rating
                                    ? "text-yellow-400"
                                    : "text-gray-600"
                                )}
                              />
                            ))}
                            <span className="text-gray-400 text-sm ml-2">
                              ({review.rating}/5)
                            </span>
                          </div>
                        </div>
                        <span className="text-gray-400 text-sm">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaStar className="text-gray-500 text-4xl mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No reviews yet</p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center ">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-400 text-2xl font-bold mb-2">
              User not found
            </p>
            <button
              onClick={() => router.push(Routes.USERS)}
              className="flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-700 transition-all duration-200 rounded-lg text-white font-semibold mx-auto cursor-pointer"
            >
              <FaArrowLeft />
              Back to Users
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailPage;
