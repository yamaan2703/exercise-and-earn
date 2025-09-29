"use client";
import React, { useEffect, useState } from "react";
import type { GetProp, TableProps } from "antd";
import { Table } from "antd";
import type { SorterResult } from "antd/es/table/interface";

type ColumnsType<T extends object = object> = TableProps<T>["columns"];
type TablePaginationConfig = Exclude<
  GetProp<TableProps, "pagination">,
  boolean
>;

interface TableParams<T> {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<T>["field"];
  sortOrder?: SorterResult<T>["order"];
  filters?: Parameters<GetProp<TableProps, "onChange">>[1];
}

interface DynamicTableProps<T extends Record<string, any>> {
  columns: ColumnsType<T>;
  data: T[];
  searchValue?: string;
  searchableFields?: (keyof T)[];
  className?: string;
  rowClassName?: (record: T, index: number) => string;
  loading?: boolean;
  pageSize?: number;
  onTableChange?: (
    pagination: any,
    filters: any,
    sorter: any,
    filteredData: T[]
  ) => void;
  rowKey?: string | ((record: T) => string);
  scroll?: { x?: string | number; y?: string | number };
}

function DynamicTable<T extends Record<string, any>>({
  columns,
  data,
  searchValue = "",
  searchableFields = [],
  className = "",
  rowClassName,
  loading = false,
  pageSize = 10,
  onTableChange,
  rowKey = "id",
  scroll = { x: 800 },
}: DynamicTableProps<T>) {
  const [filteredData, setFilteredData] = useState<T[]>(data);
  const [tableParams, setTableParams] = useState<TableParams<T>>({
    pagination: { current: 1, pageSize },
  });

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const handleTableChange: TableProps<T>["onChange"] = (
    pagination,
    filters,
    sorter
  ) => {
    let processedData = [...data];

    Object.keys(filters || {}).forEach((key) => {
      const filterValue = filters![key];
      if (filterValue && filterValue.length > 0) {
        const column = columns?.find((col) => (col as any).dataIndex === key);

        if (column && typeof column.onFilter === "function") {
          processedData = processedData.filter((item) =>
            (filterValue as number[]).some((val) => column.onFilter!(val, item))
          );
        } else {
          processedData = processedData.filter((item) =>
            (filterValue as string[]).includes(item[key])
          );
        }
      }
    });

    if (!Array.isArray(sorter) && sorter.order && sorter.field) {
      const field = sorter.field as keyof T;

      if (field) {
        processedData.sort((a, b) => {
          const aVal = a[field];
          const bVal = b[field];

          if (typeof aVal === "string" && typeof bVal === "string") {
            if (aVal.toLowerCase() < bVal.toLowerCase())
              return sorter.order === "ascend" ? -1 : 1;
            if (aVal.toLowerCase() > bVal.toLowerCase())
              return sorter.order === "ascend" ? 1 : -1;
            return 0;
          }

          if (typeof aVal === "number" && typeof bVal === "number") {
            if (aVal < bVal) return sorter.order === "ascend" ? -1 : 1;
            if (aVal > bVal) return sorter.order === "ascend" ? 1 : -1;
            return 0;
          }

          const aStr = String(aVal);
          const bStr = String(bVal);
          if (aStr < bStr) return sorter.order === "ascend" ? -1 : 1;
          if (aStr > bStr) return sorter.order === "ascend" ? 1 : -1;
          return 0;
        });
      }
    }

    setFilteredData(processedData);
    setTableParams({
      pagination,
      filters,
      sortField: Array.isArray(sorter) ? undefined : sorter.field,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
    });

    // Call external onChange handler if provided
    if (onTableChange) {
      onTableChange(pagination, filters, sorter, processedData);
    }
  };

  // Calculate pagination total based on filtered data
  const searchFilteredData =
    searchValue && searchableFields.length > 0
      ? filteredData.filter((item) =>
          searchableFields.some((field) => {
            const value = item[field];
            if (typeof value === "string") {
              return value.toLowerCase().includes(searchValue.toLowerCase());
            }
            if (typeof value === "number") {
              return value.toString().includes(searchValue);
            }
            return false;
          })
        )
      : filteredData;

  return (
    <div
      className={`overflow-auto border border-gray-400 rounded-lg ${className}`}
    >
      <Table<T>
        columns={columns}
        rowKey={
          typeof rowKey === "string" ? (record) => record[rowKey] : rowKey
        }
        dataSource={searchFilteredData}
        pagination={{
          ...tableParams.pagination,
          total: searchFilteredData.length,
        }}
        loading={loading}
        onChange={handleTableChange}
        scroll={scroll}
        rowClassName={rowClassName}
      />
    </div>
  );
}

export default DynamicTable;
