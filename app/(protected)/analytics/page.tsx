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
    <main className="lg:h-screen">
      <Navbar />

      <div className="flex justify-center items-center text-sm gap-x-2 my-10 font-semibold">
        <span className="text-[#888888]">Back to HomePage</span>/
        <span>
          <Link href="/upload">Upload Innovation</Link>
        </span>
      </div>

      <div className="gap-x-6 container lg:grid lg:grid-cols-3">
        <div className="">
          <DynamicChloropethMap />
        </div>

        <div className="w-full flex flex-col gap-y-10 lg:col-span-2">
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
                className="h-full max-h-[523px]"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
