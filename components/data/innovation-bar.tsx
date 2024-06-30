import React from "react";
import { StackedProgressBar } from "@/components/data/charts/StackedProgressBar";
import {
  ProgressLineMobileP,
  ProgressLineP,
} from "@/components/data/charts/ProgressLineP";
import {
  countProductPhaseOccurrences,
  knumberformatter,
} from "@/utils/function";
import { PRODUCT_PHASE_OPTIONS } from "@/constants/options";

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
  const colors = [
    "#00C49F",
    "#9430E3",
    "#df6280",
    "#D19FF9",
    "#F1F5A3",
    "#FBFF2F",
    "#B8F5A3",
    "#B8F5A3",
  ]; // Example colors
  const options = PRODUCT_PHASE_OPTIONS.map((option) => option.value);
  const productPhaseData = countProductPhaseOccurrences(
    innovations,
    options,
    colors
  );
  return (
    <div className="w-full bg-myoffwhie h-fit md:max-h-[141px] rounded-lg p-3 flex flex-col gap-y-3">
      <h1 className="text-black text-[12px] font-semibold leading-[18px]">
        Total innovations and implementation phase
      </h1>

      <div className="flex gap-x-4 items-start md:items-center">
        <div className="h-full flex flex-col justify-end">
          <div className="text-[30px] font-bold leading-[40px]">
            {knumberformatter(count)}
          </div>
          <div className="text-[14px] leading-[21px]">Innovations</div>
        </div>

        <div className="w-full">
          <div className="hidden md:flex">
            <ProgressLineP data={productPhaseData} />
          </div>
          <div className="md:hidden">
            <ProgressLineMobileP data={productPhaseData} />
          </div>
        </div>
      </div>
    </div>
  );
};
