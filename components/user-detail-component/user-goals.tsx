import { UserType } from "@/types/interface";
import React from "react";

const UserGoals = ({ user }: { user: UserType }) => {
  const { goal, nextGoal, achievedGoals } = user;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="bg-[#0b2d29] rounded-xl p-4 border border-teal-500/20">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          Current Goal
        </h2>
        {goal ? (
          <div className="space-y-2">
            <div className="flex justify-between py-3 border-b border-teal-500/10">
              <span className="text-gray-300">ID</span>
              <span>{goal.id}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-teal-500/10">
              <span className="text-gray-300">Calories</span>
              <span>{goal.calories}</span>
            </div>

            <div className="flex justify-between py-3">
              <span className="text-gray-300">Created At</span>
              <span>{new Date(goal.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-teal-500/10">
              <span className="text-gray-300">Updated At</span>
              <span>{new Date(goal.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">No current goal</p>
        )}
      </div>

      <div className="bg-[#0b2d29] rounded-xl p-4 border border-teal-500/20">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          Next Goal
        </h2>
        {nextGoal ? (
          <div className="space-y-2">
            <div className="flex justify-between py-3 border-b border-teal-500/10">
              <span className="text-gray-300">ID</span>
              <span>{nextGoal.id}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-teal-500/10">
              <span className="text-gray-300">Calories</span>
              <span>{nextGoal.calories}</span>
            </div>

            <div className="flex justify-between py-3">
              <span className="text-gray-300">Created At</span>
              <span>{new Date(nextGoal.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-teal-500/10">
              <span className="text-gray-300">Updated At</span>
              <span>{new Date(nextGoal.updatedAt).toLocaleDateString()}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-400">No next goal</p>
        )}
      </div>

      <div className="bg-[#0b2d29] rounded-xl p-4 border border-teal-500/20">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          Achieved Goals
        </h2>
        {achievedGoals && achievedGoals.length > 0 ? (
          <div className="space-y-3">
            {achievedGoals.map((achieved) => (
              <div
                key={achieved.id}
                className="p-3 rounded-lg bg-[#11413a]/40 border border-teal-500/10"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">ID</span>
                  <span>{achieved.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Calories</span>
                  <span>{achieved.calories}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Created At</span>
                  <span>
                    {new Date(achieved.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No achieved goals yet</p>
        )}
      </div>
    </div>
  );
};

export default UserGoals;
