import { cn } from "@/lib/utils";
import React from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    country: "USA",
    city: "New York",
    status: "Active",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    country: "Pakistan",
    city: "Karachi",
    status: "Inactive",
    joinDate: "2024-02-20",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    country: "India",
    city: "Mumbai",
    status: "Active",
    joinDate: "2024-03-10",
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah@example.com",
    country: "Canada",
    city: "Toronto",
    status: "Inactive",
    joinDate: "2024-01-05",
  },
];

const Table = () => {
  return (
    <table className="w-full">
      <thead className="bg-green-800/20">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            User
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Email
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Country
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            City
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Join Date
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-green-800">
        {users.map((user) => (
          <tr
            key={user.id}
            className="hover:bg-green-800/10 transition-colors duration-200"
          >
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="ml-4">
                  <div className="text-sm font-medium text-white">
                    {user.name}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-400">{user.email}</div>
            </td>

            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
              {user.country}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
              {user.city}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
              {user.joinDate}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span
                className={cn(
                  "text-sm font-medium",
                  user.status === "Active" ? "text-green-400" : "text-red-400"
                )}
              >
                {user.status}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
              <div className="flex gap-2">
                <button className="text-green-400 hover:text-green-200 transition-colors duration-200 cursor-pointer">
                  <FaEye />
                </button>
                <button className="text-red-400 hover:text-red-300 transition-colors duration-200 cursor-pointer">
                  <FaTrash />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
