"use client";
import { InnovationBar } from "@/components/data/innovation-bar";
import { Navbar } from "@/components/general/navbar";
import BarChartCard from "@/components/data/charts/BarChartCard";
import { DonutChartCard } from "@/components/data/charts/DonutChartCard";
import DynamicChloropethMap from "@/components/data/charts/DynamicChloropethMap";
import { message, Tour } from "antd";
import type { TourProps } from "antd";
import { useRef, useState } from "react";
import { transformInnovationsToChartData } from "@/utils/function";
import { VALUE_CHAIN_OPTIONS } from "@/constants/options";
import { countriesData } from "@/data/country-region";
import { useGetAnalyticsInnovation } from "@/hooks/useAnalyticsData";
import { TagSelect3 } from "@/components/general/tag-select3";
import { Button } from "@/components/ui/button";
import { IoMdHelpCircle } from "react-icons/io";
import { ClipLoader } from "react-spinners";

export default function AnalyticsPage() {
  const [innovation, setInnovations] = useState<IInnovationType[]>([]);
  const [count, setCount] = useState<number>(0);
  const [barChartData, setBarChartData] = useState<ChartData[]>([]);
  const [queryParams, setQueryParams] = useState({});
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps["steps"] = [
    {
      title: "Filter",
      description: `Filter the data you see on this page by year & month. \n Filter the data you see on this page by value chain. \n Filter the data you see on this page by country & state.
`,
      target: () => ref1.current,
    },
    {
      title: "Map",
      description:
        "Zoom in to see the number of innovations from your country of choice",
      target: () => ref2.current,
    },
    {
      title: "Total Innovation",
      description: "The number of innovations available on STAVMiA.",
      target: () => ref3.current,
    },
    {
      title: "Value Chain",
      description: "Innovations on STAVMiA categorized by value chain",
      target: () => ref4.current,
    },
    {
      title: "Innovation per year",
      description: "Innovations on STAVMiA categorized by year of invention.",
      target: () => ref5.current,
    },
  ];

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1900; year--) {
      years.push(year.toString());
    }
    return years;
  };

  const { isLoading } = useGetAnalyticsInnovation(
    queryParams,
    (data) => {
      setInnovations(data.data);
      setCount(data.totalCount);
      const res = transformInnovationsToChartData(data.data);
      setBarChartData(res);
    },
    (error) => {
      message.error("Network Error");
    }
  );

  const valueOptions = VALUE_CHAIN_OPTIONS.map((chain) => chain.value);
  const countryOPtions = countriesData.map((country) => country.countryName);
  const yearOptions = generateYearOptions();

  const handleTagSelectChange = (field: string, value: string) => {
    setQueryParams((prev) => ({ ...prev, [field]: value }));
    if (isLoading) {
      message.info("Searching for innovations...");
    }
  };

  return (
    <main className="w-full h-screen relative">
      <Navbar />
      <h1 className="text-[16px] leading-[24px] h-[30px] font-semibold text-center my-5">
        {isLoading ? (
          <span>
            <ClipLoader size={15} /> Getting Innovations Data...
          </span>
        ) : (
          "Analytics"
        )}
      </h1>

      <div className="container md:h-[calc(100vh-100px)] pb-10 md:pb-0">
        <div className="flex flex-col md:flex-row gap-6 md:h-[90%] h-full">
          <div className="h-full w-full md:w-[40%]">
            <div className="w-full h-full">
              <div
                className="w-full h-[70px] flex justify-between md:px-[10px] mb-2 gap-x-2"
                ref={ref1}
              >
                <TagSelect3
                  name="Filter By"
                  optionsName="Date"
                  options={yearOptions}
                  onValueChange={(value) =>
                    handleTagSelectChange("year", value)
                  }
                  loading={isLoading}
                />
                <TagSelect3
                  name="Filter By"
                  optionsName="Chain"
                  options={valueOptions}
                  onValueChange={(value) =>
                    handleTagSelectChange("chain", value)
                  }
                  loading={isLoading}
                />
                <TagSelect3
                  name="Filter By"
                  optionsName="Location"
                  options={countryOPtions}
                  onValueChange={(value) =>
                    handleTagSelectChange("country", value)
                  }
                  loading={isLoading}
                />
                <div ref={ref2}></div>
              </div>
              <div className="h-[calc(100%-85px)] hidden md:block">
                <DynamicChloropethMap innovations={innovation} />
              </div>
            </div>
          </div>
          <div className="md:w-[60%] w-full mx-auto h-full">
            <div className="flex flex-col gap-4">
              <div ref={ref3} className="w-full">
                <InnovationBar innovations={innovation} count={count} />
              </div>
              <div className="flex flex-col md:flex-row gap-4 h-full">
                <div
                  className="md:w-[40%] max-h-[500px] min-h-[300px] h-full"
                  ref={ref4}
                >
                  <DonutChartCard innovations={innovation} />
                </div>
                <div ref={ref2} className="md:hidden h-[400px] max-h-[550px]">
                  <DynamicChloropethMap innovations={innovation} />
                </div>
                <div className="md:w-[60%] flex" ref={ref5}>
                  <BarChartCard
                    title="Innovation per year"
                    subtitle="Keep track of revenue performance for the beach house for the last 12 month"
                    data={barChartData}
                    dataKey="value"
                    height={500}
                    cellFill="#61ae61"
                    XdataKey="name"
                    fill="#475467"
                    Ylabel="Revenue (N)"
                    key={1}
                    barWidth={32}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      <Button
        className="flex gap-x-2 fixed top-[90%] right-0 shadow-xl text-[10px] md:text-[14px] mr-5 md:mr-0"
        variant="outline"
        onClick={() => setOpen(true)}
      >
        <IoMdHelpCircle className="text-[18px] text-mygreen" />{" "}
        <span className="text-mygreen">Help</span>
      </Button>
    </main>
  );
}
