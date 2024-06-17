"use client";
import { Button } from "@/components/ui/button";
import { IoIosSearch } from "react-icons/io";
import { TagSelect } from "@/components/general/tag-select";
import { CircleX, LayoutGrid, List } from "lucide-react";
import { useState, useEffect } from "react";
import {
  CollectionDataTableP,
  CollectionDataImageGrid,
} from "@/components/data/collections-table";
import axios from "axios";
import { toast } from "sonner";
import { countriesData } from "@/data/country-region";
import { Skeleton } from "@/components/ui/skeleton";

export const CollectionTable = () => {
  const [displayState, setDisplayState] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [nameParam, setNameParam] = useState<string>("");
  const [queryParams, setQueryParams] = useState({
    page: pageNo,
  });
  const [innovations, setInnovations] = useState<IInnovationType[]>([]);

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const yearsArray = Array.from(
      { length: currentYear - 1970 + 1 },
      (_, index) => 1970 + index
    );
    yearsArray.sort((a, b) => b - a);

    return yearsArray;
  };
  const generateCountryArray = () => {
    return countriesData.map((country) => country.countryName);
  };
  const phaseOptions = ["testing", "distribution"];
  const yearOptions = generateYears();
  const countryOptions = generateCountryArray();

  const fetchInnovations = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<IGetInnovationResponse>(
        "/api/v1/innovation",
        {
          params: queryParams,
        }
      );
      setInnovations(data.data);
      setPageNo(data.page);
      setTotalPages(data.totalPages);
    } catch (error) {
      toast.error(
        "Please we are unable to get Innovations at his time, please try again!"
      );
    }
    setLoading(false);
  };

  const handleSetPage = async (No: number) => {
    setPageNo(No);
    setQueryParams((prev) => ({ ...prev, page: No }));
  };

  useEffect(() => {
    fetchInnovations();
  }, [queryParams]);

  const handleTagSelectChange = (field: string, value: string) => {
    setQueryParams((prev) => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    if (nameParam == "") {
      setQueryParams({
        page: pageNo,
      });
    } else {
      handleTagSelectChange("name", nameParam);
    }
  };

  return (
    <div>
      <div className="w-full">
        <h1 className="w-full font-jakara text-3xl font-bold text-center mb-10 leading-[40px]">
          Collections
        </h1>
        <div className="flex flex-col md:flex-row gap-y-4 w-full items-center space-x-4 mb-10">
          <div className="w-full py-2 px-6 rounded-xl flex gap-x-3 items-center bg-[#fafafa]">
            <IoIosSearch />
            <input
              type="text"
              className="border-0 outline-none bg-transparent w-full placeholder:text-[#888888]"
              placeholder="Search by title, value chain, use, e.t.c"
              value={nameParam}
              onChange={(e) => setNameParam(e.target.value)}
            />

            {nameParam.length > 0 && (
              <CircleX
                size={13}
                className="text-myblack cursor-pointer"
                onClick={() =>
                  setQueryParams({
                    page: pageNo,
                  })
                }
              />
            )}
          </div>
          <Button
            type="submit"
            className="px-6 bg-mygreen"
            onClick={handleSearch}
          >
            Click here to search
          </Button>
        </div>

        <div className="mb-5 flex flex-col gap-4 md:flex-row justify-between items-center">
          <div className="flex gap-x-7 flex-wrap gap-y-4 justify-between md:justify-normal">
            <TagSelect
              name="Implementation phase"
              optionsName="Phase"
              options={phaseOptions}
              onValueChange={(value) => handleTagSelectChange("phase", value)}
            />
            <TagSelect
              name="Year created"
              options={yearOptions}
              onValueChange={(value) => handleTagSelectChange("year", value)}
            />
            <TagSelect
              name="Country"
              options={countryOptions}
              onValueChange={(value) => handleTagSelectChange("country", value)}
            />

            {Object.keys(queryParams).length > 1 && (
              <Button
                size="sm"
                onClick={() =>
                  setQueryParams({
                    page: pageNo,
                  })
                }
              >
                Clear
              </Button>
            )}
          </div>

          <div className="flex gap-x-2 justify-end w-full md:w-fit">
            <Button
              variant={`${displayState == 2 ? "default" : "outline"}`}
              className={`${displayState == 2 ? "bg-mygreen" : ""}`}
              onClick={() => setDisplayState(2)}
            >
              <LayoutGrid size={16} />
            </Button>
            <Button
              variant={`${displayState == 1 ? "default" : "outline"}`}
              className={`${displayState == 1 ? "bg-mygreen" : ""}`}
              onClick={() => setDisplayState(1)}
            >
              <List size={16} />
            </Button>
          </div>
        </div>
        {loading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <div className="mt-10 mb-[100px]">
            {displayState === 1 && (
              <CollectionDataTableP innovations={innovations} />
            )}

            {displayState === 2 && (
              <CollectionDataImageGrid innovations={innovations} />
            )}
          </div>
        )}
      </div>

      <div className="mt-10">
        {totalPages > 1 && (
          <div className="mt-20 flex justify-center items-center max-w-[500px] mx-auto flex-wrap gap-4">
            {Array.from({ length: totalPages }).map((_, i) => (
              <Button
                size="sm"
                className={`rounded-full ${
                  pageNo == i + 1 && "bg-mygreen text-white"
                }`}
                variant="outline"
                key={i}
                onClick={() => handleSetPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
