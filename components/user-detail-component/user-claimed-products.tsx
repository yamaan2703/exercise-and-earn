import { UserType, RewardType } from "@/types/interface";
import React from "react";
import RewardCard from "../ui/reward-card";

const UserClaimedProducts = ({ user }: { user: UserType }) => {
  return (
    <div className="bg-[#0b2d29] rounded-xl p-3 sm:p-4 border border-teal-500/20">
      <h2 className="text-xl font-bold text-white mb-4">Rewards</h2>

      {user.rewards.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {user.rewards.map((reward: RewardType) => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      ) : (
        <p className="mt-2">No rewards yet!</p>
      )}
    </div>
  );
};

export default UserClaimedProducts;
