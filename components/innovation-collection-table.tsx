"use client";
import { Button } from "@/components/ui/button";
import { IoIosSearch } from "react-icons/io";
import { TagSelect } from "@/components/general/tag-select";
import { CircleX, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import {
  CollectionDataTableP,
  CollectionDataImageGrid,
} from "@/components/data/collections-table";
import { message } from "antd";
import { phaseOptions, valueChainOptions } from "@/constants/options";
import { generateCountryArray, generateYears } from "@/utils/function";
import { useGetInnovation } from "@/hooks/useInnovationData";
import { CollectionTableSkeleton } from "@/components/skeletons/collection-table-skeleton";
import { CollectionGridSkeleton } from "./skeletons/collection-grid-skeleton";
import { useAppContext } from "@/context/AppContext";

export const CollectionTable = () => {
  const { innovationCollection } = useAppContext();
  const [displayState, setDisplayState] = useState<number>(2);
  const [pageNo, setPageNo] = useState<number>(innovationCollection.page);
  const [totalPages, setTotalPages] = useState<number>(
    innovationCollection.totalPages
  );
  const [nameParam, setNameParam] = useState<string>("");
  const [queryParams, setQueryParams] = useState({
    page: pageNo,
  });
  const [innovations, setInnovations] = useState<IInnovationType[]>(
    innovationCollection.data
  );

  const handleSuccess = (data: IGetInnovationResponse) => {
    setInnovations(data.data);
    setPageNo(data.page);
    setTotalPages(data.totalPages);
  };

  const handleError = (error: unknown) => {
    message.error(
      "Please we are unable to get Innovations at his time, please try again!"
    );
  };

  const { isLoading } = useGetInnovation(
    queryParams,
    handleSuccess,
    handleError
  );

  const handleSetPage = async (No: number) => {
    setPageNo(No);
    setQueryParams((prev) => ({ ...prev, page: No }));
  };

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
        <h1 className="w-full font-jakara text-[24px] md:text-2xl font-bold text-center mb-10 leading-[32px]">
          Collections
        </h1>
        <div className="flex flex-col md:flex-row gap-y-4 w-full items-center space-x-4 mb-10">
          <div className="w-full py-2 px-6 rounded-xl flex gap-x-3 items-center bg-[#fafafa]">
            <IoIosSearch />
            <input
              type="text"
              className="border-0 outline-none bg-transparent w-full placeholder:text-[#888888]"
              placeholder="Search by title ..."
              value={nameParam}
              onChange={(e) => setNameParam(e.target.value)}
            />

            {nameParam.length > 0 && (
              <CircleX
                size={13}
                className="text-myblack cursor-pointer"
                onClick={() => {
                  setQueryParams({
                    page: pageNo,
                  });
                  setNameParam("");
                }}
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
          <div className="flex gap-x-3 md:gap-x-7 flex-wrap gap-y-4 justify-between md:justify-normal">
            <TagSelect
              name="Implementation phase"
              optionsName="All"
              options={phaseOptions}
              onValueChange={(value) => handleTagSelectChange("phase", value)}
            />
            <TagSelect
              name="Year created"
              optionsName="All"
              options={generateYears()}
              onValueChange={(value) => handleTagSelectChange("year", value)}
            />
            <TagSelect
              name="Country"
              optionsName="All"
              options={generateCountryArray()}
              onValueChange={(value) => handleTagSelectChange("country", value)}
            />
            <TagSelect
              name="Value Chain"
              optionsName="All"
              options={valueChainOptions}
              onValueChange={(value) => handleTagSelectChange("chain", value)}
            />
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
        {isLoading ? (
          <div className="my-10">
            {displayState === 1 && <CollectionTableSkeleton />}

            {displayState === 2 && <CollectionGridSkeleton />}
          </div>
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
