"use client";
import { InnovationBar } from "@/components/data/innovation-bar";
import { Navbar } from "@/components/general/navbar";
import BarChartCard from "@/components/data/charts/BarChartCard";
import { DonutChartCard } from "@/components/data/charts/DonutChartCard";
import DynamicChloropethMap from "@/components/data/charts/DynamicChloropethMap";
import axios from "axios";
import { message } from "antd";
import { useEffect, useState } from "react";
import { WhiteLoaderWithoutText } from "@/components/loaders/white-loader";
import { transformInnovationsToChartData } from "@/utils/function";
import { PRODUCT_PHASE_OPTIONS } from "@/constants/options";
import { TagSelect2 } from "@/components/general/tag-select";

export default function AnalyticsPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [innovation, setInnovations] = useState<IInnovationType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [barChartData, setBarChartData] = useState<ChartData[]>([]);

  const phaseOptions = PRODUCT_PHASE_OPTIONS.map((phase) => phase.value);

  const fetchInnovation = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<{
        data: IInnovationType[];
        totalCount: number;
      }>("/api/v1/analytics/innovation");
      setInnovations(data.data);
      setCount(data.totalCount);
      const res = transformInnovationsToChartData(data.data);
      setBarChartData(res);
    } catch (error) {
      console.log(error);
      message.error("Network Error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchInnovation();
  }, []);

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

      <h1 className="text-[16px] leading-[24px] font-semibold text-center my-5">
        Analytics
      </h1>

      <div className="w-full h-full container">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="w-full h-[calc(95vh-170px)] ">
            <div className="w-full h-[70px] md:flex justify-between md:px-[10px] mb-5 gap-x- hidden">
              <TagSelect2
                name="Filter By"
                optionsName="Date"
                options={phaseOptions}
              />
              <TagSelect2
                name="Filter By"
                optionsName="Value Chain"
                options={phaseOptions}
              />
              <TagSelect2
                name="Filter By"
                optionsName="Location"
                options={phaseOptions}
              />
            </div>
            <DynamicChloropethMap innovations={innovation} />
          </div>
          <div className="col-span-2 flex flex-col gap-y-4 mb-10 md:h-[calc(95vh-170px)">
            <InnovationBar innovations={innovation} count={count} />
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-[40%]">
                <DonutChartCard innovations={innovation} />
              </div>
              <div className="h-[200px] md:w-[60%]">
                <BarChartCard
                  title="Innovation per year"
                  subtitle="Keep track of revenue performance for the beach house for the last 12 month"
                  data={barChartData}
                  dataKey="value"
                  height={500}
                  cellFill="#9E77ED"
                  XdataKey="name"
                  fill="#475467"
                  Ylabel="Revenue (N)"
                  key={1}
                  barWidth={32}
                  className="h-fit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
