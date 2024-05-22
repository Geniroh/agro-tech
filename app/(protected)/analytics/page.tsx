import { BarChartP } from "@/components/data/charts/BarChartP";
import { PieChartP } from "@/components/data/charts/PieChartP";
import { InnovationBar } from "@/components/data/innovation-bar";
import { Navbar } from "@/components/general/navbar";
import Link from "next/link";

export default function AnalyticsPage() {
    return (
        <main>
            <Navbar />
            

            <div className='flex justify-center items-center text-sm gap-x-2 my-10 font-semibold'>
              <span className='text-[#888888]'>Back to HomePage</span>
              /
              <span><Link href="/upload">Upload Innovation</Link></span>
            </div>

          <div className="flex gap-x-6 container">
            <div className="lg:w-[40%]">
                <div className="min-h-[500px] rounded-lg bg-[#9a9a9a]">

                </div>
            </div>

            <div className="lg:w-[60%] flex flex-col gap-y-10">
                <div className="">
                    <InnovationBar />
                </div>
                <div className="flex gap-6">
                    <div className="lg:w-[40%] bg-[#fafafa] rounded-lg min-h-[350px] flex flex-col items-center justify-center">
                        <div className="border border-red-600">

                            <PieChartP />
                        </div>
                    </div>
                    <div className="lg:w-[60%] bg-[#9a9a9a] rounded-lg min-h-[350px] ">
                    <div className="border border-red-600">
                        <BarChartP />
                    </div>
                    </div>
                </div>
            </div>
            

          </div>
        </main>
    )
}