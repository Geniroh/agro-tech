"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import InnovationCard from "@/components/innovation-card";
import axios from "axios";
import { toast } from "sonner";

export function CollectionDataImageGrid() {
  const [pageNo, setPageNo] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [innovations, setInnovations] = useState<IInnovationType[]>([]);

  const fetchInnovations = async () => {
    try {
      const { data } = await axios.get<IGetInnovationResponse>(
        "/api/v1/innovation",
        {
          params: {
            page: pageNo,
          },
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
  };

  const handleSetPage = async (No: number) => {
    setPageNo(No);
    fetchInnovations();
  };

  useEffect(() => {
    fetchInnovations();
  }, [fetchInnovations]);
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {innovations.map((innovation, i) => (
          <InnovationCard innovation={innovation} key={i} />
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-20 flex justify-center items-center max-w-[500px] mx-auto flex-wrap gap-4">
          {Array.from({ length: totalPages }).map((page, i) => (
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
  );
}
