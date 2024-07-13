"use client";
import React, { useEffect, useState } from "react";
import { ColumnProps, TableP } from "@/components/general/p-table";
import { Skeleton } from "@/components/ui/skeleton";

const columns2: ColumnProps[] = [
  {
    header: "#",
    accessor: "id",
    render: () => <Skeleton className="w-full rounded-xl h-5" />,
  },
  {
    header: "Innovation",
    accessor: "productName",
    render: () => <Skeleton className="w-full rounded-xl h-5" />,
  },
  {
    header: "Value Chain",
    accessor: "productChain",
    render: () => <Skeleton className="w-full rounded-xl h-5" />,
  },
  {
    header: "Use",
    accessor: "productUse",
    render: () => <Skeleton className="w-full rounded-xl h-5" />,
  },
  {
    header: "Implementation Phase",
    accessor: "productPhase",
    render: () => <Skeleton className="w-full rounded-xl h-5" />,
  },
  {
    header: "Year",
    accessor: "yearInvented",
    render: () => <Skeleton className="w-full rounded-xl h-5" />,
  },
];

export const CollectionTableSkeleton = ({}) => {
  const generateSkeleonData = () => {
    let mock = [];

    for (let i = 0; i < 5; i++) {
      let payload = {
        id: i,
        productUse: `use${i}`,
        productPhase: `phase ${i}`,
        yearInvented: `year${i}`,
        producChain: `chain${i}`,
        productName: `name${i}`,
      };

      mock.push(payload);
    }

    return mock;
  };
  return (
    <div>
      <div className="w-full h-full mt-10">
        <TableP columns={columns2} data={generateSkeleonData()} />
      </div>
    </div>
  );
};
