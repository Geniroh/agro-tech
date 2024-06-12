"use client";
import {
  CollectionDataImageGrid,
  CollectionsDataTable,
} from "@/components/data/collection-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IoIosSearch } from "react-icons/io";
import { TagSelect } from "@/components/general/tag-select";
import { LayoutGrid, List } from "lucide-react";
import { useState, useEffect } from "react";
import { CollectionDataTableP } from "./data/collections-table";
import axios from "axios";
import { toast } from "sonner";

const selectList: { name: string; value: string }[] = [
  {
    name: "first item",
    value: "first",
  },
  {
    name: "second item",
    value: "second",
  },
  {
    name: "third item",
    value: "third",
  },
];

export const CollectionTable = () => {
  const [displayState, setDisplayState] = useState<number>(1);

  return (
    <div>
      <div className="w-full">
        <h1 className="w-full font-jakara text-3xl font-bold text-center mb-10 leading-[40px]">
          Collections
        </h1>
        <div className="flex w-full items-center space-x-4 mb-10">
          <div className="w-full py-2 px-6 rounded-xl flex gap-x-3 items-center bg-[#fafafa]">
            <IoIosSearch />
            <input
              type="text"
              className="border-0 outline-none bg-transparent w-full placeholder:text-[#888888]"
              placeholder="Search by title, value chain, use, e.t.c"
            />
          </div>
          <Button type="submit" className="px-6">
            Click here to search
          </Button>
        </div>

        <div className="mb-5 flex justify-between items-center">
          <div className="flex gap-x-7">
            <TagSelect name="Value Chain" options={selectList} />
            <TagSelect name="Implementation phase" options={selectList} />
            <TagSelect name="Year created" options={selectList} />
            <TagSelect name="country" options={selectList} />
          </div>

          <div className="flex gap-x-2">
            <Button
              variant={`${displayState == 2 ? "default" : "outline"}`}
              onClick={() => setDisplayState(2)}
            >
              <LayoutGrid size={16} />
            </Button>
            <Button
              variant={`${displayState == 1 ? "default" : "outline"}`}
              onClick={() => setDisplayState(1)}
            >
              <List size={16} />
            </Button>
          </div>
        </div>
        <div className="mt-10 mb-[100px]">
          {
            // displayState === 1 && <CollectionsDataTable />
            displayState === 1 && <CollectionDataTableP />
          }

          {displayState === 2 && <CollectionDataImageGrid />}
        </div>
      </div>
    </div>
  );
};
