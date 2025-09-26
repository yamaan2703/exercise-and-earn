"use client";
import { ChartComponentProps } from "@/types/interface";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const Chart = ({
  type,
  series,
  options,
  height,
  width,
}: ChartComponentProps) => {
  return (
    <ReactApexChart
      options={options}
      series={series}
      type={type}
      height={height}
      width={width}
    />
  );
};

export default Chart;
