"use client";
import React, { useEffect, useState } from "react";
import { ColumnProps, TableP } from "@/components/general/p-table";
import { ImageList } from "@/components/general/image-list";
import { ColorTag } from "@/components/general/color-tags";
import InnovationCard from "@/components/innovation-card";
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
          {record?.productMedia[0].type !== "video/mp4" ? (
            <ImageList text={name} imgUrl={record?.productMedia[0]?.url} />
          ) : (
            <div>{name}</div>
          )}
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
        <div className="flex gap-x-1 md:gap-x-2 w-full">
          {valueChainArray.map((item, i) => (
            <ColorTag name={item} type="blue" key={i} />
          ))}
        </div>
      );
    },
  },
  {
    header: "Use",
    accessor: "productUse",
    render: (value) => <div className="w-full">{value}</div>,
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

interface CollectionTablesProps {
  innovations: IInnovationType[];
  activePageNo?: number;
}

export const CollectionDataTableP = ({
  innovations,
}: CollectionTablesProps) => {
  return (
    <div>
      <div className="w-full h-full mt-10">
        <TableP columns={columns2} data={innovations} />
      </div>
    </div>
  );
};

export function CollectionDataImageGrid({
  innovations,
}: CollectionTablesProps) {
  return (
    <div>
      {innovations.length < 1 && (
        <div className="w-full min-h-[200px] flex justify-center items-center text-muted-foreground">
          ---No Data---
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {innovations.map((innovation, i) => (
          <InnovationCard innovation={innovation} key={i} />
        ))}
      </div>
    </div>
  );
}
