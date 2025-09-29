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
import { GoalItem } from "@/types/interface";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";

interface GoalModalProps {
  label: string;
  setGoals: Dispatch<SetStateAction<GoalItem[]>>;
  setEditGoalModal: Dispatch<SetStateAction<boolean>>;
  calories: string;
  setCalories: Dispatch<SetStateAction<string>>;
  reward: string;
  setReward: Dispatch<SetStateAction<string>>;
  buttonLabel: string;
  currentGoalId: string;
}

const GoalModal = (props: GoalModalProps) => {
  const {
    label,
    setGoals,
    setEditGoalModal,
    calories,
    setCalories,
    reward,
    setReward,
    buttonLabel,
    currentGoalId,
  } = props;

  const handleEditGoal = () => {
    if (!calories.trim() || !reward.trim()) {
      toast.error("Both fields are required!");
      return;
    }

    setGoals((prev) =>
      prev.map((goal) =>
        goal.id === currentGoalId
          ? { ...goal, calories: Number(calories), reward }
          : goal
      )
    );

    toast.success("Goal updated!");
    setEditGoalModal(false);
    setCalories("");
    setReward("");
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[999]">
      <div className="bg-[#06211e] text-white w-[90%] max-w-sm rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center gap-2 mb-3">
          <h2 className="text-lg font-semibold">{label}</h2>
          <button
            onClick={() => setEditGoalModal(false)}
            className="text-white hover:text-gray-400  cursor-pointer"
          >
            X
          </button>
        </div>
        <div className="mt-5 space-y-3">
          <Input
            id="question"
            type="text"
            placeholder="Enter question..."
            value={calories}
            setValue={setCalories}
            variant={InputVariant.DEFAULT}
            size={InputSize.SMALL}
            required
          />
          <Input
            id="answer"
            type="text"
            placeholder="Enter answer..."
            value={reward}
            setValue={setReward}
            variant={InputVariant.DEFAULT}
            size={InputSize.SMALL}
            required
          />
          <Button
            type={ButtonType.BUTTON}
            externalStyles="mt-3"
            label={buttonLabel}
            onClick={handleEditGoal}
            variant={ButtonVariant.THEME}
            size={ButtonSize.SMALL}
          />
        </div>
      </div>
    </div>
  );
};

export default GoalModal;
