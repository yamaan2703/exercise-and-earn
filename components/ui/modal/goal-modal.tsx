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
import { usePostGoalsMutation } from "@/redux/slices/goalSlice";

interface GoalModalProps {
  label: string;
  setAddGoalModal: Dispatch<SetStateAction<boolean>>;
}

const GoalModal = ({ label, setAddGoalModal }: GoalModalProps) => {
  const [calories, setCalories] = useState("");
  const [postGoal, { isLoading }] = usePostGoalsMutation();

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

    try {
      const response = await postGoal({ calories: calorieValue }).unwrap();

      if (response.success) {
        toast.success("Goal added successfully!");
        setAddGoalModal(false);
        setCalories("");
      }
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
            placeholder="Enter calories target..."
            value={calories}
            setValue={setCalories}
            variant={InputVariant.DEFAULT}
            size={InputSize.SMALL}
            required
          />
          <Button
            type={ButtonType.BUTTON}
            externalStyles="mt-3"
            label={isLoading ? "Adding..." : "Add Goal"}
            onClick={handleAddGoal}
            variant={ButtonVariant.THEME}
            size={ButtonSize.SMALL}
          />
        </div>
      </div>
    </div>
  );
};

export default GoalModal;
