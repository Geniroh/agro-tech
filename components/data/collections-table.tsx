"use client";
import React, { useEffect, useState } from "react";
import { ColumnProps, TableP } from "@/components/general/p-table";
import { ImageList } from "@/components/general/image-list";
import { ColorTag } from "@/components/general/color-tags";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { generateArrayFromNumber } from "@/utils/function";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import axios from "axios";
import Link from "next/link";

const columns2: ColumnProps[] = [
  {
    header: "#",
    accessor: "id",
    render: (val, row, i) => {
      return i + 1;
    },
  },
  {
    header: "Innovation",
    accessor: "productName",
    render: (name, record) => {
      return (
        <Link href={`innovations/${record.id}`}>
          <ImageList text={name} imgUrl={record?.productMedia[0]?.url} />{" "}
        </Link>
      );
    },
  },
  {
    header: "Value Chain",
    accessor: "productChain",
    render: (value: string | string[], record) => {
      const valueChainArray = Array.isArray(value) ? value : [value];
      return (
        <div className="flex gap-x-1">
          {valueChainArray.map((item, i) => (
            <ColorTag name={item} type="purple" key={i} />
          ))}
        </div>
      );
    },
  },
  {
    header: "Use",
    accessor: "productUse",
  },
  {
    header: "Implementation Phase",
    accessor: "productPhase",
  },
  {
    header: "Year",
    accessor: "yearInvented",
  },
];

const data2: IInnovationType[] = [
  {
    id: "1",
    productName: "Vertical Farming",
    yearInvented: "2024",
    country: "USA",
    cost: 5000,
    productChain: "Input supply",
    productPhase: "Wide Use",
    productUse: ["Rice Mill"],
    productDescription: "Example description",
    productMedia: [
      {
        name: "green-house.jpeg",
        url: "/images/green-house.jpeg",
      },
    ],
    isExample: true,
    productExample: [
      {
        instance_description: "Example instance",
        instance_media: {
          name: "example-media.jpeg",
          url: "/images/example-media.jpeg",
        },
      },
    ],
    productInstruction: [
      {
        instruction_step: "Step 1",
      },
    ],
    productInventor: [
      {
        inventor_name: "Inventor 1",
        inventor_email: "inventor1@example.com",
        inventor_contact: "1234567890",
      },
    ],
    productSupplier: [
      {
        supplier_name: "Supplier 1",
        supplier_email: "supplier1@example.com",
        supplier_contact: "0987654321",
      },
    ],
    productGuidelines: [
      {
        name: "Guideline 1",
      },
    ],
    isGenderFriendly: true,
    productGenderDescription: "Description here",
    createdAt: "2024-06-12T10:57:07.486Z",
    updatedAt: "2024-06-12T10:57:07.486Z",
  },
];

export const CollectionDataTableP = () => {
  const [pageNo, setPageNo] = useState<number>(4);
  const [innovations, setInnovations] = useState<IInnovationType[]>([]);

  const paginationPage = generateArrayFromNumber(pageNo);

  const fetchInnovations = async () => {
    try {
      const { data } = await axios.get<IInnovationType[]>("/api/v1/innovation");
      setInnovations(data);
    } catch (error) {
      toast.error(
        "Please we are unable to get Innovations at his time, please try again!"
      );
    }
  };

  useEffect(() => {
    fetchInnovations();
  }, []);

  return (
    <div>
      <div className="w-full h-full mt-10">
        <TableP columns={columns2} data={innovations} />
      </div>
      <div className="mt-20 flex justify-center w-full">
        <div className="flex items-center gap-3">
          <div>
            <Button size="sm">
              <FaCaretLeft className="text-white text-sm" />
            </Button>
          </div>
          <div className="flex gap-x-2 items-center">
            <div className="flex gap-x-2">
              {paginationPage.map((page) => (
                <Button
                  size="sm"
                  className="rounded-full"
                  variant="outline"
                  key={page}
                >
                  {page}
                </Button>
              ))}
            </div>
            <div className="flex gap-x-2">
              <Input
                placeholder="Enter page to jump to ..."
                size={10}
                className="max-w-[300px] placeholder:text-[11px]"
              />
              {paginationPage.length > 10 && (
                <Button size="sm" className="rounded-full" variant="outline">
                  {paginationPage.length}
                </Button>
              )}
              <Button size="sm" className="rounded-full" variant="outline">
                20
              </Button>
            </div>
          </div>
          <div>
            <Button size="sm">
              <FaCaretRight className="text-white text-sm" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
