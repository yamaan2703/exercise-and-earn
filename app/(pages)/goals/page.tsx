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
import GoalModal from "@/components/ui/modal/goal-modal";
import { useGetGoalsQuery } from "@/redux/slices/goalSlice";
import Loader from "@/components/ui/loader";
import { useRouter } from "next/navigation";
import { Routes } from "@/routes/Routes";
import Input from "@/components/ui/input";

const Goals = () => {
  const { setIsSidebarOpen } = useContext(AuthContext)!;
  const router = useRouter();
  const { data, isLoading } = useGetGoalsQuery(null);
  const [addGoalModal, setAddGoalModal] = useState(false);
  const [searchGoal, setSearchGoal] = useState("");
  const goals = data?.goals ?? [];

  useEffect(() => {
    if (data) console.log(data);
  }, [data]);

  const filteredGoals = searchGoal.trim()
    ? goals.filter((goal: GoalItem) =>
        goal.products.some((product) =>
          product.name.toLowerCase().includes(searchGoal.trim().toLowerCase())
        )
      )
    : goals;

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
          Goals
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
            placeholder="Search goal by product name..."
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
          label="Add Goal"
          onClick={() => setAddGoalModal(true)}
          icon={FaPlus}
          variant={ButtonVariant.THEME}
          size={ButtonSize.SMALL}
        />
      </div>

      <div className="bg-[#0b2d29] border border-teal-500/20 rounded-xl p-4">
        <h2 className="text-lg font-semibold text-white mb-4">
          Existing Goals
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
                  <h3 className="text-xl font-semibold text-teal-400">Goal</h3>
                  <span className="text-sm bg-teal-600/20 text-teal-300 px-3 py-1 rounded-full">
                    {goal.calories} cal
                  </span>
                </div>

                {goal.products && goal.products.length > 0 ? (
                  <div className="space-y-2">
                    <h4 className="text-gray-300 text-sm mb-1">
                      Products ({goal.products.length})
                    </h4>
                    <div className="flex flex-col gap-2">
                      {goal.products.map((product) => (
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
          <p className="text-gray-400">No goals set yet.</p>
        )}
      </div>

      {addGoalModal && (
        <GoalModal label="Add Goal" setAddGoalModal={setAddGoalModal} />
      )}
    </div>
  );
};

export default Goals;
