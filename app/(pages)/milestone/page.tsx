"use client";
import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useEffect, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaPlus, FaSearch } from "react-icons/fa";
import {
  ButtonVariant,
  ButtonSize,
  ButtonType,
  InputVariant,
  InputSize,
} from "@/types/enums";
import Button from "@/components/ui/button";
import { GoalItem } from "@/types/interface";
import { useGetGoalsQuery } from "@/redux/slices/goalSlice";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";
import Input from "@/components/ui/input";
import MilestoneModal from "@/components/ui/modal/goal-modal";

const Milestone = () => {
  const { setIsSidebarOpen } = useContext(AuthContext)!;
  const router = useRouter();
  const { data, isLoading } = useGetGoalsQuery(null);
  const [addGoalModal, setAddGoalModal] = useState(false);
  const [searchGoal, setSearchGoal] = useState("");
  const [selectedGoal, setSelectedGoal] = useState<GoalItem | null>(null);
  const [viewAllModal, setViewAllModal] = useState(false);
  const goals = data?.goals ?? [];

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  const filteredGoals: GoalItem[] = [
    ...(searchGoal.trim()
      ? goals.filter((goal: GoalItem) =>
          goal.products.some((product) =>
            product.name.toLowerCase().includes(searchGoal.trim().toLowerCase())
          )
        )
      : goals),
  ].sort((a, b) => b.id - a.id);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[100vh]">
        <Loader size="xl" />
      </div>
    );
  }
  return (
    <div className="p-1">
      <div className="flex justify-between items-center gap-2 mb-6">
        <h1 className="inline-block text-xl sm:text-3xl font-bold text-white text-center after:block after:mx-auto after:w-1/2 after:border-b-4 after:border-b-teal-500 after:rounded-full after:mt-1">
          Milestone
        </h1>
        <div
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 text-lg text-white hover:text-gray-400 cursor-pointer"
        >
          <AiOutlineMenu className="size-5 sm:size-6" />
        </div>
      </div>

      <div className="mb-3 flex justify-between gap-2">
        <div className="max-w-[400px] w-full">
          <Input
            placeholder="Search milestone by product name..."
            type="text"
            id="search"
            value={searchGoal}
            setValue={setSearchGoal}
            variant={InputVariant.OUTLINE}
            size={InputSize.SMALL}
            iconLeft={<FaSearch />}
          />
        </div>
        <Button
          type={ButtonType.BUTTON}
          label="Add Milestone"
          onClick={() => setAddGoalModal(true)}
          icon={FaPlus}
          variant={ButtonVariant.THEME}
          size={ButtonSize.SMALL}
        />
      </div>

      <div className="bg-[#0b2d29] border border-teal-500/20 rounded-xl p-4">
        <h2 className="text-lg font-semibold text-white mb-4">
          Existing Milestones
        </h2>
        {filteredGoals.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGoals.map((goal: GoalItem) => (
              <div
                key={goal.id}
                className="bg-[#0f3a34]/60 border border-teal-500/20 
                 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-teal-400">
                    Milestone
                  </h3>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => router.push(Routes.ADD_PRODUCT)}
                      title="Add Product"
                      className="bg-teal-600/20 hover:bg-teal-600/40 text-teal-300 text-xs px-3 py-1 flex items-center rounded-full transition-all"
                    >
                      Add Product
                    </button>
                    <span className="text-xs bg-teal-600/20 text-teal-300 px-2 py-1 rounded-full">
                      {goal.calories} cal
                    </span>
                  </div>
                </div>

                {goal.products && goal.products.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="text-gray-300 text-sm mb-1">
                      Products ({goal.products.length})
                    </h4>
                    <div className="flex flex-col gap-2">
                      {goal.products.slice(0, 1).map((product) => (
                        <div
                          key={product.id}
                          onClick={() =>
                            router.push(Routes.PRODUCTS_DETAIL(product.id))
                          }
                          className="bg-[#07332d]/70 border border-teal-700/30 rounded-lg px-3 py-2"
                        >
                          <p className="text-white font-medium text-sm cursor-pointer hover:underline">
                            {product.name}
                          </p>
                        </div>
                      ))}
                    </div>

                    {goal.products.length > 1 && (
                      <button
                        onClick={() => {
                          setSelectedGoal(goal);
                          setViewAllModal(true);
                        }}
                        className="text-teal-400 text-xs mt-2 ml-1 hover:text-teal-300 cursor-pointer hover:underline transition"
                      >
                        See all products
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="mt-6 text-gray-500 text-sm italic text-center py-4 border border-dashed border-gray-600 rounded-lg">
                    No products added yet
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No milestones set yet.</p>
        )}
      </div>

      {addGoalModal && (
        <MilestoneModal
          label="Add Milestone"
          setAddGoalModal={setAddGoalModal}
        />
      )}

      {viewAllModal && selectedGoal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#0f3a34] border border-teal-500/30 rounded-xl p-4 w-[90%] sm:w-[600px] max-h-[80vh] overflow-y-auto relative shadow-2xl">
            <div className="flex justify-between mb-3">
              <h3 className="text-lg font-semibold text-teal-400">Milestone</h3>
              <button
                onClick={() => setViewAllModal(false)}
                className="text-gray-400 hover:text-white text-lg"
              >
                ✕
              </button>
            </div>

            <div className="flex items-center gap-1 mb-3">
              <span className="text-xs bg-teal-600/20 text-teal-300 px-2 py-1 rounded-full">
                {selectedGoal.calories} calories
              </span>
            </div>

            <div className="border-t border-teal-700/20 my-3" />

            {selectedGoal.products && selectedGoal.products.length > 0 ? (
              <div className="space-y-2">
                {selectedGoal.products.map((product) => (
                  <div
                    key={product.id}
                    onClick={() =>
                      router.push(Routes.PRODUCTS_DETAIL(product.id))
                    }
                    className="bg-[#07332d]/70 border border-teal-700/30 rounded-lg px-4 py-2 cursor-pointer hover:bg-[#0d413b]/80 transition"
                  >
                    <p className="text-white font-medium text-sm hover:underline">
                      {product.name}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic text-center mt-4">
                No products available.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Milestone;
