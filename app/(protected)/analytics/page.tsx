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
import BreadcrumbP from "@/components/general/my-breadcrumb";
import axios from "axios";
import { message } from "antd";
import { useEffect, useState } from "react";
import { WhiteLoaderWithoutText } from "@/components/loaders/white-loader";
import { transformInnovationsToChartData } from "@/utils/function";

export default function AnalyticsPage() {
  const [query, setQuery] = useState<{}>();
  const [loading, setLoading] = useState<boolean>(false);
  const [innovation, setInnovations] = useState<IInnovationType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [barChartData, setBarChartData] = useState<ChartData[]>([]);

  const fetchInnovation = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<{
        data: IInnovationType[];
        totalCount: number;
      }>("/api/v1/analytics/innovation");
      console.log(data);
      setInnovations(data.data);
      setCount(data.totalCount);
      const res = transformInnovationsToChartData(data.data);
      setBarChartData(res);
      console.log(res);

      // setBarChartData(res);
    } catch (error) {
      console.log(error);
      message.error("Network Error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInnovation();
  }, [query]);

  if (loading) {
    return <WhiteLoaderWithoutText />;
  }
  return (
    <main className="lg:max-h-screen">
      <Navbar />
      {/* <div className="flex justify-center items-center">
        <BreadcrumbP
          fromHref="/"
          fromTitle="Back to Home page"
          toHref="/analytics"
          toTitle="Analytics"
          className="hidden md:block"
        />
        <h1 className="text-[16px] leading-[24px] font-semibold text-center md:hidden my-10">
          Analytics
        </h1>
      </div> */}

      <h1 className="text-[16px] leading-[24px] font-semibold text-center my-10">
        Analytics
      </h1>

      <div className="w-full h-full container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="w-full h-[calc(95vh-170px)] border mb-10">
            <DynamicChloropethMap innovations={innovation} />
          </div>
          <div className="col-span-2 flex flex-col gap-y-4 mb-10 md:h-[calc(95vh-170px)">
            <InnovationBar innovations={innovation} count={count} />
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-[40%]">
                <DonutChartCard />
              </div>
              <div className="h-[200px] md:w-[60%]">
                <BarChartCard
                  title="Innovation per year"
                  subtitle="Keep track of revenue performance for the beach house for the last 12 month"
                  data={barChartData}
                  dataKey="value"
                  height={250}
                  cellFill="#9E77ED"
                  XdataKey="name"
                  fill="#475467"
                  Ylabel="Revenue (N)"
                  key={1}
                  barWidth={32}
                  // className="h-full max-h-[523px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center items-center text-sm gap-x-2 my-10 font-semibold">
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
      </div> */}
    </main>
  );
}
