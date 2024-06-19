import React from "react";
import { StackedProgressBar } from "@/components/data/charts/StackedProgressBar";
import { ProgressLineP } from "@/components/data/charts/ProgressLineP";
import { knumberformatter } from "@/utils/function";

const data = [
  { title: "Proposed", value: 2000, color: "#9430e3" },
  { title: "In Production", value: 5000, color: "#d19ff9" },
  { title: "In Testing Phase", value: 20000, color: "#ecdafb" },
  { title: "In Wide Use", value: 2500, color: "#dbb3c2" },
  { title: "In Phased Out", value: 2500, color: "#f1f5a3" },
];

export const InnovationBar = ({
  innovations,
  count,
}: {
  innovations: IInnovationType[];
  count: number;
}) => {
  const values = [20, 30, 60, 25]; // Example values
  const colors = ["#9430E3", "#D19FF9", "#ECDAFB", "#DBB3C2"]; // Example colors
  return (
    <div className="w-full bg-myoffwhie h-fit md:max-h-[141px] rounded-lg p-3 flex flex-col gap-y-3">
      <h1 className="text-black text-[12px] font-semibold leading-[18px]">
        Total innovations and implementation phase
      </h1>

      <div className="flex gap-x-4 items-center">
        <div className="h-full flex flex-col justify-end">
          <div className="text-[30px] font-bold leading-[40px]">
            {knumberformatter(count)}
          </div>
          <div className="text-[14px] leading-[21px]">Innovations</div>
        </div>

        <div className="w-full">
          {/* <StackedProgressBar values={values} colors={colors} /> */}
          <ProgressLineP data={data} />
        </div>
      </div>
    </div>
  );
};
