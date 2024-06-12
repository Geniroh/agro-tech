"use client";
import { BarChartP } from "@/components/data/charts/BarChartP";
import { PieChartP } from "@/components/data/charts/PieChartP";
import { InnovationBar } from "@/components/data/innovation-bar";
import { Navbar } from "@/components/general/navbar";
import Link from "next/link";
import { RevenueMock } from "@/mocks/data";
import BarChartCard from "@/components/data/charts/BarChartCard";
import { DonutChartCard } from "@/components/data/charts/DonutChartCard";
// import { ChloropethMap } from "@/components/data/charts/ChloropethMap";
import DynamicChloropethMap from "@/components/data/charts/DynamicChloropethMap";

export default function AnalyticsPage() {
  return (
    <main>
      <Navbar />

      <div className="flex justify-center items-center text-sm gap-x-2 my-10 font-semibold">
        <span className="text-[#888888]">Back to HomePage</span>/
        <span>
          <Link href="/upload">Upload Innovation</Link>
        </span>
      </div>

      <div className="flex gap-x-6 container">
        <div className="md:w-[443px] h-[688px]">
          <DynamicChloropethMap />
        </div>

        <div className="w-full Xl:w-[60%] flex flex-col gap-y-10">
          <div className="">
            <InnovationBar />
          </div>
          <div className="flex gap-6">
            <div className="lg:w-[40%] ">
              <div className="">
                <DonutChartCard />
              </div>
            </div>
            <div className="lg:w-[60%] rounded-lg min-h-[350px] h-full">
              <BarChartCard
                title="Revenue Performance"
                subtitle="Keep track of revenue performance for the beach house for the last 12 month"
                data={RevenueMock}
                dataKey="value"
                height={400}
                cellFill="#9E77ED"
                XdataKey="name"
                fill="#475467"
                Ylabel="Revenue (N)"
                key={1}
                barWidth={32}
                className="h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
