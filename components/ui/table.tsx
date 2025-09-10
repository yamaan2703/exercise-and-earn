import React, { FC } from "react";
import { GlobalToken, Table } from "antd";
import { createStyles } from "antd-style";
import { DataType } from "@/types/interface";
import { columns, dataSource } from "@/Data/usersData";

const useStyle = createStyles(({ css, token }: any) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

const TableComponent: FC = () => {
  const { styles } = useStyle();
  return (
    <div className="overflow-x-auto max-w-[100vw] rounded-md shadow-md">
      <Table<DataType>
        className={styles.customTable}
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default TableComponent;
