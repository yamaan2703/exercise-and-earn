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

  const filteredGoals = goals.filter((goal: GoalItem) =>
    goal.id.toString().includes(searchGoal.trim())
  );

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
            placeholder="Search goal by their id..."
            type="number"
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
          <div className="space-y-4">
            {filteredGoals.map((goal: GoalItem) => (
              <div
                key={goal.id}
                className="bg-[#11413a]/40 border border-teal-500/10 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-teal-400 font-semibold text-base sm:text-lg">
                    Goal #{goal.id}
                  </h3>
                  <span className="text-white font-medium">
                    {goal.calories} cal
                  </span>
                </div>

                {goal.products && goal.products.length > 0 ? (
                  <div>
                    <h4 className="text-gray-300 text-sm mb-2">
                      Products ({goal.products.length}):
                    </h4>
                    <div className="space-y-2">
                      {goal.products.map((product) => (
                        <div
                          key={product.id}
                          className="bg-[#06211e]/60 rounded px-3 py-2 flex justify-between items-center text-sm"
                        >
                          <p
                            onClick={() =>
                              router.push(Routes.PRODUCTS_DETAIL(product.id))
                            }
                            className="text-white hover:underline cursor-pointer"
                          >
                            {product.name}
                          </p>
                          <span className="text-gray-400">
                            {product.calories} cal
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">
                    No products assigned yet
                  </p>
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
