import Image from "next/image";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import InnovationCard from "@/components/innovation-card";
import { CollectionTable } from "@/components/collection-table";
import { Navbar } from "@/components/general/navbar";

const innovationList: InnovationType[] = [
    {
        name: "Powerful mill",
        usage: "Used in rice production",
        id: 1,
    },
    {
        name: "Efficient irrigation system",
        usage: "Saves water usage by 30%",
        id: 2,
    },
    {
        name: "Smart crop monitoring device",
        usage: "Real-time data on crop health",
        id: 3,
    },
    {
        name: "Smart crop monitoring device",
        usage: "Real-time data on crop health",
        id: 4,
    },

];

export default function Home() {
  return (
    <div>
        <Navbar />
        <main className="container mx-auto">
            <h1 className="text-3xl font-playfair font-bold mt-14">Sustainable Technologies for Agricultural Value-Chain Mechanization in Africa</h1>

            <div className="mt-10">
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-6">
                    <div className="col-span-2">
                        <InnovationCard innovation={innovationList[0]} />
                    </div>
                    <div>
                        <InnovationCard innovation={innovationList[1]} />
                    </div>
                    <div>
                        <InnovationCard innovation={innovationList[2]} />
                    </div>
                    <div className="col-span-2">
                        <InnovationCard innovation={innovationList[4]} />
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <CollectionTable />
            </div>
        </main>
    </div>
  );
}

