"use client";
import dynamic from "next/dynamic";

const DynamicChloropethMap = dynamic(
  () => import("./ChloropethMap").then((mod) => mod.default),
  {
    ssr: false, // This ensures the component is only rendered on the client side
  }
);

export default DynamicChloropethMap;
