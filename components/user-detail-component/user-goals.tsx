import { UserType } from "@/types/interface";
import React from "react";
import { Flame, Target, Trophy } from "lucide-react";

const UserGoals = ({ user }: { user: UserType }) => {
  const { goal, nextGoal, achievedGoals } = user;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="bg-[#0f3d37] border border-teal-600/20 rounded-2xl p-5 shadow-md hover:shadow-teal-500/10 transition-all duration-300">
        <div className="flex items-center gap-2 mb-5">
          <Flame className="text-teal-400" size={22} />
          <h2 className="text-lg font-semibold text-white">Current Goal</h2>
        </div>

        {goal ? (
          <div className="space-y-5">
            <div className="flex justify-between border-b border-teal-500/10">
              <span className="text-gray-300">Calories</span>
              <span className="text-white font-medium">{goal.calories}</span>
            </div>
            <div className="flex justify-between border-b border-teal-500/10">
              <span className="text-gray-300">Created At</span>
              <span className="text-white">
                {new Date(goal.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between ">
              <span className="text-gray-300">Updated At</span>
              <span className="text-white">
                {new Date(goal.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 italic mt-2">No current goal</p>
        )}
      </div>

      <div className="bg-[#0f3d37] border border-teal-600/20 rounded-2xl p-5 shadow-md hover:shadow-teal-500/10 transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          <Target className="text-teal-400" size={22} />
          <h2 className="text-lg font-semibold text-white">Next Goal</h2>
        </div>

        {nextGoal ? (
          <div className="space-y-5">
            <div className="flex justify-between border-b border-gray-700/40">
              <span className="text-gray-300">Calories</span>
              <span className="text-white">{nextGoal.calories}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Created At</span>
              <span className="text-white">
                {new Date(nextGoal.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-300">Updated At</span>
              <span className="text-white">
                {new Date(nextGoal.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 italic mt-2">No next goal</p>
        )}
      </div>

      <div className="bg-[#0f3d37] border border-teal-600/20 rounded-2xl p-5 shadow-md hover:shadow-teal-500/10 transition-all duration-300">
        <div className="flex items-center gap-2 mb-4">
          <Trophy className="text-teal-400" size={22} />
          <h2 className="text-lg font-semibold text-white">Achieved Goals</h2>
        </div>

        {achievedGoals && achievedGoals.length > 0 ? (
          <div className="space-y-3 max-h-[270px] overflow-y-auto pr-1 scrollbar-hide">
            {achievedGoals.map((achieved) => (
              <div
                key={achieved.id}
                className="p-3 rounded-xl bg-[#11413a]/60 border border-teal-600/20 hover:border-teal-400/40 transition-all"
              >
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Calories</span>
                  <span className="text-white font-medium">
                    {achieved.calories}
                  </span>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <span className="text-gray-300">Created At</span>
                  <span className="text-white">
                    {new Date(achieved.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 italic mt-2">No achieved goals yet</p>
        )}
      </div>
    </div>
  );
};

export default UserGoals;
