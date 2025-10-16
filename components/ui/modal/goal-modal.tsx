"use client";
import Input from "../input";
import {
  ButtonSize,
  ButtonType,
  ButtonVariant,
  InputSize,
  InputVariant,
} from "@/types/enums";
import Button from "../button";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction, useState } from "react";
import {
  useGetGoalsQuery,
  usePostGoalsMutation,
} from "@/redux/slices/goalSlice";
import { GoalItem } from "@/types/interface";

interface GoalModalProps {
  label: string;
  setAddGoalModal: Dispatch<SetStateAction<boolean>>;
}

const MilestoneModal = ({ label, setAddGoalModal }: GoalModalProps) => {
  const [calories, setCalories] = useState("");
  const [postGoal, { isLoading }] = usePostGoalsMutation();
  const { data } = useGetGoalsQuery(null);

  const handleAddGoal = async () => {
    if (!calories.trim()) {
      toast.error("Calorie field is required!");
      return;
    }

    const calorieValue = Number(calories);
    if (isNaN(calorieValue) || calorieValue <= 0) {
      toast.error("Please enter a valid calorie value!");
      return;
    }

    const existingGoals = data?.goals ?? [];
    const duplicateGoal = existingGoals.find(
      (goal: GoalItem) => goal.calories === calorieValue
    );

    if (duplicateGoal) {
      toast.error(`A goal with ${calorieValue} calories already exists!`);
      return;
    }

    try {
      await postGoal({ calories: calorieValue }).unwrap();

      toast.success("Goal added successfully!");
      setAddGoalModal(false);
      setCalories("");
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Something went wrong");
      console.error("Error adding goal:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]">
      <div className="bg-[#06211e] text-white w-[90%] max-w-sm rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center gap-2 mb-3">
          <h2 className="text-lg font-semibold">{label}</h2>
          <button
            onClick={() => setAddGoalModal(false)}
            className="text-white hover:text-gray-400 cursor-pointer text-xl leading-none"
          >
            X
          </button>
        </div>
        <div className="mt-5 space-y-3">
          <Input
            id="calories"
            type="number"
            label="Calories"
            placeholder="Enter calories target..."
            value={calories}
            setValue={setCalories}
            variant={InputVariant.DEFAULT}
            size={InputSize.SMALL}
            required
          />

          <div className="flex justify-end mt-4">
            <Button
              type={ButtonType.BUTTON}
              label={isLoading ? "Adding..." : "Add Milestone"}
              onClick={handleAddGoal}
              variant={ButtonVariant.THEME}
              size={ButtonSize.SMALL}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MilestoneModal;
