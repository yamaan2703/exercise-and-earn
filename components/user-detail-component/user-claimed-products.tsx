import { UserType, RewardType } from "@/types/interface";
import { Routes } from "@/routes/Routes";
import { useRouter } from "next/navigation";
import React from "react";

const UserClaimedProducts = ({ user }: { user: UserType }) => {
  const router = useRouter();

  return (
    <div className="bg-[#0b2d29] rounded-xl p-3 sm:p-4 border border-teal-500/20">
      <h2 className="text-xl font-bold text-white mb-4">Rewards</h2>

      {user.rewards.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {user.rewards.map((reward: RewardType) => (
            <div
              key={reward.id}
              className="bg-[#11413a] rounded-lg border border-teal-500/10 p-3"
            >
              <h3
                className="text-white font-semibold cursor-pointer hover:underline mb-2"
                onClick={() =>
                  router.push(Routes.PRODUCTS_DETAIL(reward.productId))
                }
              >
                Reward #{reward.id}
              </h3>

              <div className="text-gray-300 text-sm space-y-1">
                <p>
                  <span className="text-white">Product ID:</span>{" "}
                  {reward.productId}
                </p>
                <p>
                  <span className="text-white">Achieved:</span>{" "}
                  {reward.achieved ? "Yes" : "No"}
                </p>
                <p>
                  <span className="text-white">Claimed:</span>{" "}
                  {reward.claimed ? "Yes" : "No"}
                </p>
                <p>
                  <span className="text-white">Unlocked:</span>{" "}
                  {reward.unlocked ? "Yes" : "No"}
                </p>

                {reward.achievedAt && (
                  <p>
                    <span className="text-white">Achieved At:</span>{" "}
                    {new Date(reward.achievedAt).toLocaleDateString()}
                  </p>
                )}
                {reward.claimedAt && (
                  <p>
                    <span className="text-white">Claimed At:</span>{" "}
                    {new Date(reward.claimedAt).toLocaleDateString()}
                  </p>
                )}
                {reward.unlockedAt && (
                  <p>
                    <span className="text-white">Unlocked At:</span>{" "}
                    {new Date(reward.unlockedAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-2">No rewards yet!</p>
      )}
    </div>
  );
};

export default UserClaimedProducts;
