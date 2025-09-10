import { DataType } from "@/types/interface";
import { MdDelete, MdVisibilityOff } from "react-icons/md";
import { Tag, type TableColumnsType } from "antd";
import { Status } from "@/types/enums";
import { cn } from "@/lib/utils";

export const columns: TableColumnsType<DataType> = [
  {
    title: "Full Name",
    width: 100,
    dataIndex: "name",
    key: "name",
    fixed: "left",
  },
  {
    title: "Age",
    width: 100,
    dataIndex: "age",
    key: "age",
    fixed: "left",
    sorter: true,
  },
  { title: "Country", dataIndex: "country", key: "1" },
  { title: "City", dataIndex: "city", key: "2" },
  { title: "Date of birth", dataIndex: "dob", key: "3" },
  {
    title: "Status",
    dataIndex: "status",
    key: "4",
    render: (status: Status) => (
      <span
        className={cn(
          status === Status.ACTIVE ? "text-green-500" : "text-red-500",
          "capitalize"
        )}
      >
        {status}
      </span>
    ),
  },
  { title: "Column 5", dataIndex: "address", key: "5" },
  { title: "Column 6", dataIndex: "address", key: "6" },
  { title: "Column 7", dataIndex: "address", key: "7" },
  { title: "Column 8", dataIndex: "address", key: "8" },
  { title: "Column 9", dataIndex: "address", key: "9" },
  { title: "Column 10", dataIndex: "address", key: "10" },
  {
    title: "Action",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => (
      <div className="flex items-center gap-3">
        <button
          className="text-green-500 hover:text-green-600 transition cursor-pointer"
          title="Hide"
        >
          <MdVisibilityOff size={20} />
        </button>
        <button
          className="text-red-500 hover:text-red-700 transition cursor-pointer"
          title="Delete"
        >
          <MdDelete size={20} />
        </button>
      </div>
    ),
  },
];

export const dataSource: DataType[] = [
  {
    key: "1",
    name: "Olivia",
    age: 32,
    country: "USA",
    city: "New York",
    dob: "12-3-2011",
    status: Status.ACTIVE,
    address: "New York Park",
  },
  {
    key: "2",
    name: "Ethan",
    age: 40,
    country: "UK",
    city: "London",
    dob: "12-3-2014",
    status: Status.INACTIVE,
    address: "London Park",
  },
  {
    key: "3",
    name: "Ethan",
    age: 40,
    country: "UK",
    city: "London",
    dob: "14-7-2008",
    status: Status.INACTIVE,
    address: "London Park",
  },
  {
    key: "4",
    name: "Olivia",
    age: 32,
    country: "USA",
    city: "New York",
    dob: "22-10-2007",
    status: Status.ACTIVE,
    address: "New York Park",
  },
];
