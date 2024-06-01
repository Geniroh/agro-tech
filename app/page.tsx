import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InnovationCard from "@/components/innovation-card";
import { CollectionTable } from "@/components/collection-table";
import { Navbar } from "@/components/general/navbar";
import ImageCard from "@/components/general/image-card";
import { ColorTag } from "@/components/general/color-tags";
import { Footer } from "@/components/general/footer";

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
        <h1 className="text-[32px] font-jakara font-bold  mt-14 leading-[42px]">
          Sustainable Technologies for Agricultural Value-Chain Mechanization in
          Africa
        </h1>
        {/* <h2 className="text-xl text-mygray text-center">Expertly chosen agro-technologies provided by the Pan African Society for Agricultural Engineering (PASAE)</h2> */}
        <h2 className="text-[18px] leading-[27px] font-normal text-[#242424] mt-3">
          Welcome to STAVMiA, the central hub for agricultural innovations
          across Africa! Helping farmers, processors, input suppliers, business
          owners, consultants, and researchers find valuable technologies and
          methods easily. Our platform allows everyone in the agricultural value
          chain to access, share, discuss, and collaborate on technologies,
          boosting agro productivity. Join us in transforming agriculture in
          Africa!
        </h2>

        <div className="mt-10">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-2">
              <ImageCard
                id={1}
                imageUrl="/images/farm-automation.jpeg"
                title="Farm Automation"
                tags={
                  <div className="flex gap-4">
                    {" "}
                    <ColorTag type="blue" name="Self driving tractors" />{" "}
                    <ColorTag type="yellow" name="Smart sprinklers" />
                  </div>
                }
              />
            </div>
            <div>
              <ImageCard
                id={1}
                imageUrl="/images/green-house.jpeg"
                title="Green House"
                tags={
                  <div className="flex gap-4">
                    {" "}
                    <ColorTag type="blue" name="Pest control" />{" "}
                    <ColorTag type="purple" name="Disease control" />
                  </div>
                }
              />
            </div>

            <div>
              <ImageCard
                id={2}
                imageUrl="/images/animal-farm.jpeg"
                title="Green House"
                tags={
                  <div className="flex gap-4">
                    {" "}
                    <ColorTag type="purple" name="Economy" />{" "}
                    <ColorTag type="yellow" name="Dairy processor" />
                  </div>
                }
              />
            </div>

            <div className="col-span-2">
              <ImageCard
                id={3}
                imageUrl="/images/plantation.jpeg"
                title="Green House"
                tags={
                  <div className="flex gap-4">
                    {" "}
                    <ColorTag type="blue" name="Sustainable" />{" "}
                    <ColorTag type="yellow" name="Food security" />
                  </div>
                }
              />
            </div>
          </div>
        </div>

        <div className="mt-[100px]">
          <CollectionTable />
        </div>
      </main>
      <Footer />
    </div>
  );
}
