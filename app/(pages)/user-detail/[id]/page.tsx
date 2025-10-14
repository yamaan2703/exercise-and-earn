"use client";
import { useContext, useEffect, useState } from "react";
import { UserTabs } from "@/Data/Data";
import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
  StatusUser,
  UserDetailTab,
} from "@/types/enums";
import { useParams, useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/button";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai";
import { AuthContext } from "@/context/AuthContext";
import UserProfile from "@/components/user-detail-component/user-profile";
import UserCalories from "@/components/user-detail-component/user-calories";
import UserClaimedProducts from "@/components/user-detail-component/user-claimed-products";
import {
  useActivateUserMutation,
  useGetUserbyIdQuery,
} from "@/redux/slices/userSlice";
import ConfirmationModal from "@/components/ui/modal/confirmation-modal";
import Loader from "@/components/ui/loader";
import UserGoals from "@/components/user-detail-component/user-goals";
import toast from "react-hot-toast";

const UserDetailPage = () => {
  const { setIsSidebarOpen, activeModal, setActiveModal } =
    useContext(AuthContext)!;
  const [activateUser] = useActivateUserMutation();
  const { id } = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(UserDetailTab.PROFILE);
  const { data, isLoading } = useGetUserbyIdQuery(id as string);
  const user = data?.user;

  useEffect(() => {
    if (user) console.log("user", user);
  }, [user]);

  const handleActiveUser = async (id: string) => {
    try {
      await activateUser(id).unwrap();

      setActiveModal(false);
      toast.success("User activated successfully!");
    } catch (error) {
      console.error("Error activating user:", error);
      toast.error("Failed to activate user");
    }
  };

  if (isLoading)
    return (
      <p className="flex justify-center items-center min-h-[100vh]">
        <Loader size="xl" />
      </p>
    );
  return (
    <div className="min-h-screen p-1">
      {user ? (
        <>
          <div className="">
            <div className="flex justify-between items-center gap-2 mb-6">
              <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
                User Detail
              </h1>
              <div
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
              >
                <AiOutlineMenu className="size-5 sm:size-6" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-teal-600 to-teal-700 rounded-xl p-8 mb-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="size-20 bg-white/20 rounded-full flex items-center justify-center">
                    {user.image && (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                    )}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-white mb-1">
                      {user.name}
                    </h1>
                    <p className="text-teal-100 text-lg">{user.email}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <span
                    className={`px-4 py-2 rounded-full text-center text-sm font-semibold ${
                      user.status === StatusUser.ACTIVE
                        ? "bg-green-500/20 text-green-300 border border-green-500"
                        : "bg-red-200 text-red-400 border border-red-500/50"
                    }`}
                  >
                    {user.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center mb-4 gap-1 bg-[#0d332e] p-2 rounded-lg border border-teal-500/20">
              {UserTabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer",
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

            {activeTab === UserDetailTab.PROFILE && <UserProfile user={user} />}

            {activeTab === UserDetailTab.CALORIES && (
              <UserCalories user={user} />
            )}

            {activeTab === UserDetailTab.REWARDS && (
              <UserClaimedProducts user={user} />
            )}

            {activeTab === UserDetailTab.GOALS && <UserGoals user={user} />}

            {user.status === StatusUser.INACTIVE && (
              <div
                className="fixed bottom-0 left-0 w-full bg-[#0b2d29]/95 backdrop-blur-md border-t border-teal-500/30 
                  flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 px-4 py-3 z-50"
              >
                <p className="text-red-500 text-sm ml-0 lg:ml-[16rem]">
                  This user is currently inactive. Would you like to proceed
                  with activation?
                </p>
                <Button
                  type={ButtonType.BUTTON}
                  label="Activate User"
                  variant={ButtonVariant.THEME}
                  size={ButtonSize.SMALL}
                  onClick={() => setActiveModal(true)}
                />
              </div>
            )}
          </div>

          {activeModal && user?.status === StatusUser.INACTIVE && (
            <ConfirmationModal
              title="Confirm Activate User"
              description={`Are you sure you want to activate "${
                user?.name || "this user"
              }"?`}
              onClick={() => handleActiveUser(user.id)}
              onCancel={() => setActiveModal(false)}
            />
          )}
        </>
      ) : (
        <div className="flex justify-center ">
          <div className="flex flex-col items-center">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-red-400 text-2xl font-bold mb-2">
              User not found
            </p>
            <Button
              type={ButtonType.BUTTON}
              label="Back"
              icon={FaArrowLeft}
              variant={ButtonVariant.THEME}
              onClick={() => router.back()}
              size={ButtonSize.MEDIUM}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailPage;
