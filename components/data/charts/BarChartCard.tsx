import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ReferenceLine,
  LabelList,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";

const CustomTooltip = ({ active, payload }: { active: any; payload: any }) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload;
    return (
      <div className="bg-white shadow-md p-2 rounded-sm">
        <p className="text-[12px] font-normal">{`Name: ${dataPoint.name}`}</p>
        <p className="text-[12px] font-normal">{`Value: ${dataPoint.value}`}</p>
      </div>
    );
  }
  return null;
};

export interface BarChartCardProps {
  title: string;
  subtitle?: string;
  className?: string;
  height: string | number;
  data: any[];
  fill: string;
  XdataKey?: string;
  YdataKey?: string;
  dataKey: string;
  topLabelDataKey?: string;
  cellFill: string;
  Xlabel?: string;
  Ylabel?: string;
  barWidth?: number;
  totalKey?: string;
  topBarColor?: string;
  Ymax?: number;
}

const knumberformatter = (num: number): string => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    return num.toString();
  }
};

const BarChartCard = ({
  title,
  subtitle,
  // height = 400,
  data,
  fill = "#000",
  XdataKey,
  YdataKey,
  dataKey,
  cellFill = "#ed6c3c",
  className,
  Xlabel,
  Ylabel,
  barWidth = 70,
  topLabelDataKey = "",
  totalKey,
  topBarColor = "#8884d8",
  Ymax,
}: BarChartCardProps) => {
  const yDomain = [
    0,
    Ymax || Math.max(...data.map((item) => item[totalKey || dataKey])) * 1,
  ];

  return (
    <div
      className={`bg-myoffwhie shadow-[15px] rounded-lg flex flex-col justify-between  w-full p-5  ${className}`}
    >
      <span className="text-[#101828] text-[14px] font-semibold">{title}</span>
      <ResponsiveContainer width="100%" height="100%" minHeight="200px">
        <BarChart data={data} margin={{ top: 5, left: -22, bottom: 5 }}>
          <ReferenceLine y={0} stroke="#77808e" />
          <XAxis
            className="text-[12px] text-dark-grey"
            axisLine={false}
            tickLine={false}
            dataKey={XdataKey}
            type="category"
            tick={{ fill }}
            label={Xlabel}
          />
          <YAxis
            className="md:text-[12px] text-dark-grey"
            type="number"
            axisLine={false}
            tickLine={false}
            domain={yDomain}
            tick={{ fill }}
            tickFormatter={knumberformatter} // Use your custom number formatter
          />
          <Tooltip
            content={<CustomTooltip active={true} payload={data} />}
            cursor={{ fill: "transparent" }}
          />
          <Bar
            dataKey={dataKey}
            barSize={barWidth}
            strokeWidth={1}
            radius={[5, 5, 5, 5]}
            stackId="a"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry[dataKey] < 0 ? "#FF002A" : cellFill}
              />
            ))}
            <LabelList
              dataKey={topLabelDataKey}
              position="top"
              fill="#050C1F6"
              style={{
                fontSize: "10px",
                fontWeight: "normal",
              }}
            />
          </Bar>
          {totalKey && (
            <Bar
              dataKey={(dataPoint) => dataPoint[totalKey] - dataPoint[dataKey]}
              fill={topBarColor}
              barSize={barWidth}
              stackId="a"
              radius={[5, 5, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={topBarColor} />
              ))}
            </Bar>
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCard;
