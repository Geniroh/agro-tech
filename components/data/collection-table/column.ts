"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export type InnovationTableColumn = {
  id: string;
  name: string;
  chain: string | string[];
  usage: string | string[];
  phase: string;
  year: string;
}

export const columns: ColumnDef<InnovationTableColumn>[] = [
  {
    accessorKey: "name",
    header: "#",
    cell: (info) => info.row.index + 1 
  },
  {
    accessorKey: "name",
    header: "Innovation",
  },
  {
    accessorKey: "chain",
    header: "Value Chain",
    cell: ({ getValue }) => {
      const value = getValue<string | string[]>();
      if (Array.isArray(value)) {
        return value.join(", "); 
      }
      return value;
    },
  },
  {
    accessorKey: "usage",
    header: "Usage",
    cell: ({ getValue }) => {
      const value = getValue<string | string[]>();
      if (Array.isArray(value)) {
        return value.join(", "); 
      }
      return value;
    },
  },
  {
    accessorKey: "phase",
    header: "Implementation Phase",
  },
  {
    accessorKey: "year",
    header: "Year",
  },
]


// "use client"

// import { ColumnDef } from "@tanstack/react-table"

// // This type is used to define the shape of our data.
// // You can use a Zod schema here if you want.
// export type Payment = {
//   id: string
//   amount: number
//   status: "pending" | "processing" | "success" | "failed"
//   email: string
// }

// export type InnovationTableColumn = {
//   id: string;
//   name: string;
//   chain: string;
//   usage: string | string[];
//   phase: string;
//   year: string;
// }

// export const columns: ColumnDef<InnovationTableColumn>[] = [
//   {
//     accessorKey: "name",
//     header: "#",
//     cell: (info) => info.row.index + 1 
//   },
//   {
//     accessorKey: "name",
//     header: "Innovation",
//   },
//   {
//     accessorKey: "chain",
//     header: "Value Chain",
//   },
//   {
//     accessorKey: "usage",
//     header: "Usage",
//     cell: ({ getValue }) => {
//       const value = getValue<string | string[]>();
//       if (Array.isArray(value)) {
//         return (
//           <div className="flex flex-wrap gap-2">
//             {value.map((item, index) => (
//               <span
//                 key={index}
//                 className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
//               >
//                 {item}
//               </span>
//             ))}
//           </div>
//         );
//       }
//       return (
//         <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm">
//           {value}
//         </span>
//       );
//     },
//   },
//   {
//     accessorKey: "phase",
//     header: "Phase",
//   },
//   {
//     accessorKey: "year",
//     header: "Year",
//   },
// ]

