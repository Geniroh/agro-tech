import React from "react";
import { PieChart, ResponsiveContainer, Pie, Cell, Tooltip } from "recharts";
import { VALUE_CHAIN_OPTIONS } from "@/constants/options";
import { countValueChainOccurrences } from "@/utils/function";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FFE9D0",
  "#BBE9FF",
  "#402E7A",
  "#3DC2EC",
  "#FFF455",
];

const CustomTooltip = ({
  active,
  payload,
}: {
  active: boolean;
  payload: any[];
}) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="bg-white shadow-md p-2 rounded-sm">
        <p className="text-[12px] font-normal">{`Name: ${dataPoint.name}`}</p>
        <p className="text-[12px] font-normal">{`Value: ${dataPoint.value}`}</p>
      </div>
    );
  }
};

export const DonutChartCard = ({
  innovations,
}: {
  innovations: IInnovationType[];
}) => {
  const valueChainOptions = VALUE_CHAIN_OPTIONS.map((option) => option.value);
  const InnovationData = countValueChainOccurrences(
    innovations,
    valueChainOptions
  );

  return (
    <div className="bg-[#fafafa] rounded-lg h-full max-h-[523px]  flex flex-col gap-y-4 p-5">
      <h1 className="text-[14px]  font-semibold self-start">Value Chain</h1>
      <div
        style={{ width: "100%", height: "100%" }}
        className="flex justify-center items-center md:mt-[-20px]"
      >
        <PieChart width={219} height={219}>
          <Tooltip
            content={<CustomTooltip active={true} payload={data} />}
            cursor={{ fill: "transparent" }}
          />
          <Pie
            data={InnovationData}
            dataKey="value"
            outerRadius={100}
            innerRadius={50}
            fill="green"
          >
            {InnovationData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                width={400}
              />
            ))}
          </Pie>
        </PieChart>
      </div>
      <div className="flex mt-5 flex-col md:flex-row gap-y-4 justify-center items-center gap-x-2 md:flex-wrap md:mt-[-10px]">
        {InnovationData.map((item, i) => (
          <div className="flex gap-x-4 md:gap-x-1" key={i}>
            <span
              className={`w-[18px] h-[18px] rounded-md `}
              style={{ background: COLORS[i % COLORS.length] }}
            ></span>
            <span className="text-[14px] font-semibold">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
