"use client";
import { AuthContext } from "@/context/AuthContext";
import React, { useContext, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";
import {
  InputVariant,
  InputSize,
  ButtonVariant,
  ButtonSize,
  ButtonType,
} from "@/types/enums";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { GoalItem } from "@/types/interface";
import ConfirmationModal from "@/components/ui/modal/confirmation-modal";
import GoalModal from "@/components/ui/modal/goal-modal";

const initialGoals = [
  { id: "1", calories: 100, reward: "Water Bottle" },
  { id: "2", calories: 200, reward: "Smart Watch" },
];

const Goals = () => {
  const { setIsSidebarOpen, goalDeleteModal, setGoalDeleteModal } =
    useContext(AuthContext)!;
  const [calories, setCalories] = useState("");
  const [reward, setReward] = useState("");
  const [editCalories, setEditCalories] = useState("");
  const [editReward, setEditReward] = useState("");
  const [goals, setGoals] = useState<GoalItem[]>(initialGoals);
  const [goalToDelete, setGoalToDelete] = useState<string>("");
  const [editGoalModal, setEditGoalModal] = useState(false);
  const [currentGoalId, setCurrentGoalId] = useState("");

  const handleAddGoal = () => {
    if (!calories || !reward) return;
    const newGoal: GoalItem = {
      id: Date.now().toString(),
      calories: Number(calories),
      reward,
    };
    setGoals([...goals, newGoal]);
    setCalories("");
    setReward("");
  };

  const handleDeleteGoal = (id: string) => {
    setGoals(goals.filter((goal) => goal.id !== id));
    setGoalDeleteModal(false);
  };

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

      <div className="bg-[#0b2d29] border border-teal-500/20 rounded-xl p-4 mb-3">
        <h2 className="text-lg font-semibold text-white mb-3">Add New Goal</h2>
        <form className="flex flex-col sm:flex-row gap-2">
          <Input
            placeholder="Calories..."
            type="number"
            id="calories"
            value={calories}
            setValue={setCalories}
            variant={InputVariant.OUTLINE}
            size={InputSize.SMALL}
            required
          />
          <Input
            placeholder="Reward..."
            type="text"
            id="reward"
            value={reward}
            setValue={setReward}
            variant={InputVariant.OUTLINE}
            size={InputSize.SMALL}
            required
          />
          <Button
            type={ButtonType.BUTTON}
            label="Add Goal"
            onClick={handleAddGoal}
            icon={FaPlus}
            variant={ButtonVariant.THEME}
            size={ButtonSize.SMALL}
          />
        </form>
      </div>

      <div className="bg-[#0b2d29] border border-teal-500/20 rounded-xl p-4">
        <h2 className="text-lg font-semibold text-white mb-4">
          Existing Goals
        </h2>
        {goals.length > 0 ? (
          <table className="w-full border-collapse text-sm sm:text-base">
            <thead>
              <tr className="text-teal-400 border-b border-teal-500/20">
                <th className="py-2 text-left">Calories Burn</th>
                <th className="py-2 text-left">Reward</th>
                <th className="py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal: GoalItem) => (
                <tr
                  key={goal.id}
                  className="text-white border-b border-gray-700/50 hover:bg-[#11413a]/40 transition"
                >
                  <td className="py-2">{goal.calories} cal</td>
                  <td className="py-2">{goal.reward}</td>
                  <td className="py-2 flex justify-center gap-3">
                    <button
                      title="Edit"
                      onClick={() => {
                        setEditGoalModal(true);
                        setEditCalories(goal.calories.toString());
                        setEditReward(goal.reward);
                        setCurrentGoalId(goal.id);
                      }}
                      className="text-white hover:text-gray-300 cursor-pointer"
                    >
                      <FaEdit />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => {
                        setGoalDeleteModal(true);
                        setGoalToDelete(goal.id);
                      }}
                      className="text-white hover:text-gray-300 cursor-pointer"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">No goals set yet.</p>
        )}
      </div>
      {editGoalModal && (
        <GoalModal
          label="Edit Goal"
          setGoals={setGoals}
          setEditGoalModal={setEditGoalModal}
          calories={editCalories}
          setCalories={setEditCalories}
          reward={editReward}
          setReward={setEditReward}
          buttonLabel="Edit Goal"
          currentGoalId={currentGoalId}
        />
      )}
      {goalDeleteModal && (
        <ConfirmationModal
          title="Confirm Goal Delete"
          description="Are you sure you want to delete this goal?"
          onClick={() => handleDeleteGoal(goalToDelete)}
          onCancel={() => setGoalDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default Goals;
