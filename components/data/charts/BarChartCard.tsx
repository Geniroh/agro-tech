// import React from "react";
// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   ReferenceLine,
//   LabelList,
//   ResponsiveContainer,
//   Cell,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";

// const CustomTooltip = ({ active, payload }: { active: any; payload: any }) => {
//   if (active && payload && payload.length) {
//     const dataPoint = payload[0].payload;
//     return (
//       <div className="bg-white shadow-md p-2 rounded-sm">
//         <p className="text-[12px] font-normal">{`Name: ${dataPoint.name}`}</p>
//         <p className="text-[12px] font-normal">{`Value: ${dataPoint.value}`}</p>
//       </div>
//     );
//   }
//   return null;
// };

// export interface BarChartCardProps {
//   title: string;
//   subtitle?: string;
//   className?: string;
//   height: string | number;
//   data: any[];
//   fill: string;
//   XdataKey?: string;
//   YdataKey?: string;
//   dataKey: string;
//   topLabelDataKey?: string;
//   cellFill: string;
//   Xlabel?: string;
//   Ylabel?: string;
//   barWidth?: number;
//   totalKey?: string;
//   topBarColor?: string;
//   Ymax?: number;
// }

// const BarChartCard = ({
//   title,
//   subtitle,
//   height = 400,
//   data,
//   fill = "#000",
//   XdataKey,
//   YdataKey,
//   dataKey,
//   cellFill = "#ed6c3c",
//   className,
//   Xlabel,
//   Ylabel,
//   barWidth = 70,
//   topLabelDataKey = "",
//   totalKey,
//   topBarColor = "#8884d8",
//   Ymax,
// }: BarChartCardProps) => {
//   // const yMax = Ymax || Math.max(...data.map(item => Math.max(item[dataKey], totalKey ? item[totalKey] : 0)));
//   // const yMin = (Ymax * -1) || Math.min(...data.map(item => Math.min(item[dataKey], totalKey ? item[totalKey] : 0)));
//   // const yDomain = [Math.min(0, yMin), Math.max(0, yMax) * 1.2];
//   const yDomain = [
//     0,
//     Ymax || Math.max(...data.map((item) => item[totalKey || dataKey])) * 1,
//   ];

//   return (
//     <div
//       className={`bg-myoffwhie shadow-[15px] border-border border-2 rounded-lg border-slate-100 w-full p-5 ${className}`}
//     >
//       <span className="text-[#101828] text-[14px] font-semibold">{title}</span>
//       <div className="p-10 relative">
//         <div
//           className={`${
//             totalKey ? "left-[2px]" : "left-[-10px]"
//           } top-[50%] absolute -rotate-90 text-[#475467] text-[12px]`}
//         >
//           {Ylabel}
//         </div>

//         <div style={{ width: "100%", height: "200px" }}>
//           <ResponsiveContainer width="100%" height={"90%"}>
//             <BarChart data={data} margin={{ top: 5, left: -22, bottom: 5 }}>
//               {/* <CartesianGrid vertical={false} /> */}
//               <ReferenceLine y={0} stroke="#77808e" />
//               <XAxis
//                 className="text-[12px] text-dark-grey"
//                 axisLine={false}
//                 tickLine={false}
//                 dataKey={XdataKey}
//                 type="category"
//                 tick={{ fill }}
//                 label={Xlabel}
//               />
//               <YAxis
//                 className="md:text-[12px] text-dark-grey"
//                 type="number"
//                 axisLine={false}
//                 tickLine={false}
//                 domain={yDomain}
//                 tick={{ fill }}
//               />
//               <Tooltip
//                 content={<CustomTooltip active={true} payload={data} />}
//                 cursor={{ fill: "transparent" }}
//               />
//               <Bar
//                 dataKey={dataKey}
//                 barSize={barWidth}
//                 strokeWidth={1}
//                 radius={[5, 5, 5, 5]}
//                 stackId="a"
//               >
//                 {data.map((entry: any, index: number) => (
//                   <Cell
//                     key={`cell-${index}`}
//                     fill={entry[dataKey] < 0 ? "#FF002A" : cellFill}
//                   />
//                 ))}
//                 <LabelList
//                   dataKey={topLabelDataKey}
//                   position="top"
//                   fill="#050C1F6"
//                   style={{
//                     fontSize: "10px",
//                     fontWeight: "normal",
//                   }}
//                 />
//               </Bar>
//               {totalKey && (
//                 <Bar
//                   dataKey={(dataPoint: any) =>
//                     dataPoint[totalKey] - dataPoint[dataKey]
//                   }
//                   fill={topBarColor}
//                   barSize={barWidth}
//                   stackId="a"
//                   radius={[5, 5, 0, 0]}
//                 >
//                   {data.map((entry: any, index: number) => (
//                     <Cell key={`cell-${index}`} fill={topBarColor} />
//                   ))}
//                 </Bar>
//               )}
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BarChartCard;

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
      className={`bg-myoffwhie shadow-[15px] rounded-lg h-full flex flex-col justify-between  w-full p-5 ${className}`}
    >
      <span className="text-[#101828] text-[14px] font-semibold">{title}</span>
      <ResponsiveContainer width="100%" height="90%">
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
