import React from "react";

const UserClaimedProducts = () => {
  return (
    <div className="bg-[#0d332e] rounded-xl p-4 border border-teal-500/20">
      <h2 className="text-xl font-bold text-white mb-4">Claimed Products</h2>

      <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10 mb-3">
        <h3 className="text-white mb-3 font-semibold">Skipping Rope</h3>

        <div className="text-gray-300 text-sm space-y-1">
          <p>
            <span className="text-gray-300">Calorie Required: </span>
            100cal
          </p>
          <p>
            <span className="text-gray-300">Size:</span> S
          </p>
          <p className="text-red-500">
            <span className="text-gray-300">Color:</span> red
          </p>
          <p>
            <span className="text-gray-300">Delivery Fee:</span> $30
          </p>
        </div>
      </div>
      <div className="bg-[#11413a] p-4 rounded-lg border border-teal-500/10">
        <h3 className="text-white mb-3 font-semibold">Water Bottle</h3>

        <div className="text-gray-300 text-sm space-y-1">
          <p>
            <span className="text-gray-300">Calorie Required: </span>
            100cal
          </p>
          <p className="text-red-500">
            <span className="text-gray-300">Color:</span> red
          </p>
          <p>
            <span className="text-gray-300">Delivery Fee:</span> $30
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserClaimedProducts;
