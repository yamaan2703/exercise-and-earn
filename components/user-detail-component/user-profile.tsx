import { UserType } from "@/types/interface";
import React from "react";

const UserProfile = ({ user }: { user: UserType }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="bg-[#0b2d29] rounded-xl p-3 sm:p-6 border border-teal-500/20">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          Profile Details
        </h2>

        <div className="space-y-2">
          <div className="flex justify-between gap-2 items-center py-3 border-b border-teal-500/10">
            <span className="text-gray-300">Id</span>
            <span>{user.id}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
            <span className="text-gray-300">Name</span>
            <span>{user.name}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
            <span className="text-gray-300 font-medium flex items-center gap-2">
              Email
            </span>
            <span>{user.email}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
            <span className="text-gray-300 font-medium flex items-center gap-2">
              Phone
            </span>
            <span>{user.phone}</span>
          </div>

          <div className="flex justify-between gap-2 items-center py-3 border-b border-teal-500/10">
            <span className="text-gray-300 font-medium flex items-center gap-2">
              Created At
            </span>
            <span>{user.createdAt}</span>
          </div>
        </div>
      </div>

      <div className="bg-[#0b2d29] rounded-xl p-3 sm:p-6 border border-teal-500/20">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
          Extra Details
        </h2>

        <div className="space-y-2">
          <div className="flex justify-between items-center gap-2 py-3 border-b border-teal-500/10">
            <span className="text-gray-300 font-medium">External Id</span>
            <span>{user.externalId}</span>
          </div>

          <div className="flex justify-between items-center gap-2 py-3 border-b border-teal-500/10">
            <span className="text-gray-300 font-medium">Device Id</span>
            <span>{user.device?.deviceId}</span>
          </div>

          <div className="flex justify-between gap-4 items-center py-3 border-b border-teal-500/10">
            <span className="text-gray-300 font-medium">Address</span>
            <span>{user.address}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
            <span className="text-gray-300 font-medium">Gender</span>
            <span>{user.gender}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-teal-500/10">
            <span className="text-gray-300 font-medium">Birthday</span>
            <span>{user.dob}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
