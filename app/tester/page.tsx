// import React from "react";

// const page = () => {
//   return (
//     <div
//       style={{
//         background: "#242424",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         width: "100vw",
//       }}
//     >
//       <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             flexDirection: "column",
//             gap: "10px",
//           }}
//         >
//           <svg
//             width="250"
//             height="100"
//             viewBox="0 0 126 21"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M11.8105 20.5V13.7051H3.96289L0.326172 10.0684V5.98047L3.96289 2.35742H6.01367V8.79688H14.3535L17.8672 12.4336V16.877L14.2441 20.5H11.8105ZM6.9707 5.625V2.35742H14.2305L17.375 5.51562V7.44336H11.8105V5.625H6.9707ZM0.326172 15.0586H6.36914V17.2188H10.8535V20.5H3.375L0.326172 16.877V15.0586ZM24.6484 7.25195H30.9375V20.5H24.6484V7.25195ZM19.918 2.35742H35.668V6.30859H19.918V2.35742ZM47.4531 18.5176H41.5195L42.7773 14.9219H46.0586L41.2051 2.35742H47.0977L54.3301 20.5H48.2188L47.4531 18.5176ZM39.9062 20.5H34.0684L40.5488 3.17773L43.2285 10.3828L39.9062 20.5ZM64.1055 20.5H58.2266L51.6641 2.35742H57.8301L64.1055 20.5ZM65.0488 2.35742H71.1191L64.8438 19.9531L62.123 11.9688L65.0488 2.35742ZM72.3906 2.35742H78.8164L83.6836 10.4238L87.5117 3.86133V12.9941L83.1504 20.5L72.3906 2.35742ZM88.4004 20.5V2.35742H94.4434V20.5H88.4004ZM72.377 20.5V4.03906L78.0234 13.5137V20.5H72.377ZM97.4785 5.98047H103.535V20.5H97.4785V5.98047ZM97.4785 0.320312H103.535V4.17578H97.4785V0.320312ZM118.492 18.5176H112.559L113.816 14.9219H117.098L112.244 2.35742H118.137L125.369 20.5H119.258L118.492 18.5176ZM110.945 20.5H105.107L111.588 3.17773L114.268 10.3828L110.945 20.5Z"
//               fill="#329632"
//             />
//           </svg>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "center",
//               gap: "5px",
//               alignItems: "center",
//             }}
//           >
//             <p style={{ color: "#fff", fontSize: "18px" }}>Loading</p>
//             <p
//               style={{
//                 border: "8px solid transparent",
//                 borderTop: "8px solid #329632",
//                 borderRadius: "50%",
//                 width: "10px",
//                 height: "10px",
//                 animation: "spinLoader 1s linear infinite",
//               }}
//             ></p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;

"use client";
import React, { useState } from "react";
import { Form, Button, message } from "antd";
import { StyledFileInput } from "@/components/general/upload-input"; // adjust the import path as needed

const { Item } = Form;

const Step2: React.FC = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (
    fileDataArray: {
      url: string | null;
      name: string | null;
      size: number | null;
      type: string | null;
    }[]
  ) => {
    setFileList((prev) => [...prev, ...fileDataArray]);
    console.log("CLIENT", fileDataArray);
    form.setFieldsValue({ product_media: fileDataArray });
    console.log(fileList);
    if (fileDataArray.some((file) => file.url === null)) {
      message.error("Some files failed to upload.");
    } else {
      message.success("Files uploaded successfully.");
    }
  };

  return (
    <Form form={form} layout="vertical" className="space-y-4">
      <div>
        <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
          Product Media
        </h3>
        <Item
          name="product_media"
          rules={[{ required: true, message: "Please upload a file" }]}
        >
          <StyledFileInput
            id="product_media"
            name="product_media"
            onChange={handleFileChange}
            placeholder="Upload images/videos of product"
            className="w-full"
          />
        </Item>
        {fileList.map((file, i) => (
          <span className="block mb-1" key={i}>
            {file?.name}
          </span>
        ))}
      </div>

      <Button>Submit</Button>
    </Form>
  );
};

export default Step2;

// "use client";
// import React, { useState, useEffect } from "react";
// import { Input, Form, Select, Button, Upload, message } from "antd";
// import { UploadOutlined } from "@ant-design/icons";
// import type { UploadProps } from "antd";

// const { Item } = Form;

// const Step2: React.FC = () => {
//   const [form] = Form.useForm();
//   const [fileList, setFileList] = useState<any[]>();

//   const [isUploading, setIsUploading] = useState(false);

//   useEffect(() => {}, []);

//   const uploadFileProps: UploadProps = {
//     name: "file",
//     action: "/api/v1/upload",
//     fileList: fileList,
//     onChange(info) {
//       const { status, name, response } = info.file;
//       if (status === "uploading") {
//         setFileList(info.fileList);
//         setIsUploading(true);
//       }
//       if (status === "done") {
//         setIsUploading(false);
//         message.success(`${info.file.name} file uploaded successfully`);
//         console.log({ response: info.file.response });
//         const { url } = info.file.response;
//         const myFiles = info.file.response?.files.map(
//           (
//             file: { filename: string; size: number; url: string },
//             i: number
//           ) => {
//             return {
//               name: info.file.name,
//               url: file.url,
//               type: info.file.type,
//               size: info.file.size,
//             };
//           }
//         );
//         console.log(myFiles);

//         const uploadedFile = {
//           name: info.file.name,
//           url,
//           type: info.file.type,
//           size: info.file.size,
//         };
//         setFileList([uploadedFile]);
//         form.setFieldsValue({ product_media: uploadedFile });
//         console.log(uploadedFile);
//       } else if (info.file.status === "error") {
//         message.error(`${info.file.name} file upload failed.`);
//       }
//     },
//     progress: {
//       strokeColor: {
//         "0%": "#108ee9",
//         "100%": "#fff",
//       },
//       strokeWidth: 3,
//       format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
//     },
//     onRemove(file) {
//       setFileList([]);
//       console.log(file);
//     },
//   };

//   return (
//     <Form form={form} layout="vertical" className="space-y-4">
//       <div>
//         <h3 className="text-[16px] leading-[24px] font-semibold mb-3">
//           Product Media
//         </h3>
//         <Item
//           name="product_media"
//           rules={[{ required: true, message: "Please upload a file" }]}
//         >
//           <Upload {...uploadFileProps} multiple maxCount={5}>
//             <Button icon={<UploadOutlined />} className="w-full">
//               Click to add images/videos of product
//             </Button>
//           </Upload>
//         </Item>
//       </div>

//       <Button disabled={isUploading}>Submit</Button>
//     </Form>
//   );
// };

// export default Step2;

// "use client";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { Capsule } from "@/components/general/capsule";
// import { Upload } from "lucide-react";
// import { VideoPlayer } from "@/components/general/video-player";
// import { FaCheckCircle, FaPhone } from "react-icons/fa";
// import axios from "axios";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { Skeleton } from "@/components/ui/skeleton";
// import { ForumChats } from "@/components/general/forum-chats";
// import { useRouter, useParams } from "next/navigation";
// import { RenderMedia } from "@/components/general/render-media";
// import { ShareButton } from "@/components/general/share-button";
// import { InnovationReactions } from "@/components/innovationComp/innovation-reaction-button";
// import { InnovationDiscussionForum } from "@/components/innovationComp/innovation-discussion-form";
// import { IoPlay } from "react-icons/io5";
// import BreadcrumbP from "@/components/general/my-breadcrumb";
// import { Navbar } from "@/components/general/navbar";

// const InnovationPage = () => {
//   const router = useRouter();
//   const params = useParams<{ innovation_id: string }>();
//   const { innovation_id } = params;

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [data, setData] = useState<IInnovationType>();
//   const [comments, setComments] = useState<IInnovationComment[]>();

//   const fetchData = async (id: string) => {
//     setLoading(true);
//     setError(null);

//     try {
//       const { data } = await axios.get<IInnovationType>(
//         `/api/v1/innovation/${id}`
//       );
//       const { data: comments } = await axios.get<{
//         message: string;
//         comments: IInnovationComment[];
//       }>(`/api/v1/innovation/${innovation_id}/discussion`);

//       setData(data);
//       setComments(comments.comments);
//     } catch (error) {
//       setError("Network Error, please try again!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(innovation_id);
//   });

//   if (loading) {
//     return (
//       <div className="flex flex-col space-y-3 w-full container">
//         <Skeleton className="h-[300px] w-full mt-10" />
//         <div className="space-y-2">
//           <Skeleton className="h-4 w-full" />
//           <Skeleton className="h-4 w-[200px]" />
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <section className="flex items-center h-full sm:p-16 dark:bg-gray-50 dark:text-gray-800">
//         <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 512 512"
//             className="w-40 h-40 dark:text-gray-400"
//           >
//             <path
//               fill="currentColor"
//               d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
//             ></path>
//             <rect
//               width="176"
//               height="32"
//               x="168"
//               y="320"
//               fill="currentColor"
//             ></rect>
//             <polygon
//               fill="currentColor"
//               points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
//             ></polygon>
//             <polygon
//               fill="currentColor"
//               points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
//             ></polygon>
//           </svg>
//           <p className="text-md">
//             Looks like there was a problem getting innovation. For more
//             information, please contact @help
//           </p>
//           <Link
//             href="/"
//             className="text-mygreen font-semibold hover:text-mygreen/70"
//           >
//             Back to home page
//           </Link>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       {!data ? (
//         <section className="flex items-center h-full sm:p-16 dark:bg-gray-50 dark:text-gray-800">
//           <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 512 512"
//               className="w-40 h-40 dark:text-gray-400"
//             >
//               <path
//                 fill="currentColor"
//                 d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
//               ></path>
//               <rect
//                 width="176"
//                 height="32"
//                 x="168"
//                 y="320"
//                 fill="currentColor"
//               ></rect>
//               <polygon
//                 fill="currentColor"
//                 points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
//               ></polygon>
//               <polygon
//                 fill="currentColor"
//                 points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
//               ></polygon>
//             </svg>
//             <p className="text-md">
//               Looks like there was a problem getting innovation. For more
//               information, please contact @help
//             </p>
//             <Link
//               href="/"
//               className="text-mygreen font-semibold hover:text-mygreen/70"
//             >
//               Back to home page
//             </Link>
//           </div>
//         </section>
//       ) : (
//         <div className="container pb-20">
//           <BreadcrumbP
//             fromHref="/"
//             fromTitle="Back to Home"
//             toHref=""
//             toTitle="Upload Invention Page"
//           />

//           <div className="w-full">
//             <div>
//               <h1 className="w-full text-center text-4xl font-playfair font-semibold">
//                 {data?.productName}
//               </h1>
//             </div>
//             <div className="flex flex-wrap items-center justify-center max-w-[1200px] mt-7 text-sm tracking-wide mx-auto gap-y-2">
//               <div className="flex">
//                 <span className="text-muted-foreground mr-2">Inventor:</span>
//                 <span className="flex gap-1 flex-wrap">
//                   {data?.productInventor && data?.productInventor.length > 0 ? (
//                     <>
//                       {data?.productInventor.map((inventor, i) => (
//                         <span key={i}>{inventor.inventor_name}</span>
//                       ))}
//                     </>
//                   ) : (
//                     ""
//                   )}
//                 </span>
//               </div>
//               <div className="mx-4">|</div>
//               <div>
//                 <span className="text-muted-foreground mr-2">
//                   Year Invented:
//                 </span>
//                 <span>{data?.yearInvented}</span>
//               </div>
//               <div className="mx-4">|</div>
//               <div>
//                 <span className="text-muted-foreground mr-2">Country:</span>
//                 <span>{data?.country}</span>
//               </div>
//               <div className="mx-4">|</div>
//               <div>
//                 <span className="text-muted-foreground mr-2">Cost:</span>
//                 <span>{data?.cost}</span>
//               </div>
//             </div>
//             <div className="flex flex-wrap items-center justify-center max-w-[900px] mt-6 md:mt-3 text-sm tracking-wide mx-auto gap-y-3">
//               <div className="flex items-center">
//                 <span className="text-muted-foreground mr-2">Value Chain:</span>
//                 <span className="flex gap-x-2">
//                   {data?.productChain.split(" ").map((chain, index) => (
//                     <Capsule key={index}>{chain}</Capsule>
//                   ))}
//                 </span>
//               </div>
//               <div className="mx-4 hidden md:block">|</div>
//               <div className="flex items-center">
//                 <span className="text-muted-foreground mr-2">
//                   Implementation Phase:
//                 </span>
//                 <span className="flex gap-x-2">
//                   <Capsule>{data?.productPhase}</Capsule>
//                 </span>
//               </div>
//               <div className="mx-4 hidden md:block">|</div>
//               <div className="flex items-center">
//                 <span className="text-muted-foreground mr-2">Usage:</span>
//                 <span className="flex gap-x-2">
//                   {data?.productUse.map((use, index) => (
//                     <Capsule key={index}>{use}</Capsule>
//                   ))}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="w-full border shadow-sm rounded-md mt-5 max-w-[1000px] mx-auto h-[35px] flex items-center justify-between px-2">
//             <InnovationReactions innovationId={innovation_id} />

//             <div className="flex gap-x-4">
//               <ShareButton link={`innovation/${innovation_id}`} />

//               <button
//                 className="flex items-center text-xs"
//                 onClick={() => router.push("/upload")}
//               >
//                 <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
//                   <Upload size={13} />
//                 </span>
//                 <span>Upload Innovation</span>
//               </button>
//             </div>
//           </div>

//           <div className="mt-16">
//             {!data?.productMedia[0].url ? (
//               <div className="w-full h-[380px] bg-[#f2f2f2] flex justify-center items-center">
//                 <IoPlay className="text-4xl cursor-pointer" />
//               </div>
//             ) : (
//               <RenderMedia
//                 media={data?.productMedia[0]}
//                 className="w-full h-[380px]"
//                 key={data?.productMedia[0].name}
//               />
//             )}
//           </div>

//           <div>
//             <div className="grid grid-cols-4 gap-6 mt-10">
//               {data?.productMedia.map((media, i) => (
//                 <RenderMedia
//                   media={media}
//                   key={i}
//                   className="rounded-md h-[95px] w-[68px] md:h-[120px] md:w-full lg:h-[200px]"
//                 />
//               ))}
//             </div>

//             <div className="mt-10">
//               <h2 className="text-2xl text-muted-foreground">Description</h2>
//               <p className="leading-8">{data?.productDescription}</p>
//             </div>

//             <div className="mt-10">
//               <h2 className="text-2xl text-muted-foreground">
//                 Additional Info
//               </h2>
//               <Accordion type="single" collapsible className="w-full">
//                 <AccordionItem value="item-1">
//                   <AccordionTrigger className="px-3 font-semibold">
//                     How to Use
//                   </AccordionTrigger>
//                   <AccordionContent className="mt-5 px-6">
//                     <ul>
//                       {data?.productUse.map((use, i) => (
//                         <li key={i}>{use}</li>
//                       ))}
//                     </ul>
//                   </AccordionContent>
//                 </AccordionItem>

//                 <AccordionItem value="item-2">
//                   <AccordionTrigger className="px-3 font-semibold">
//                     Contact Supplier
//                   </AccordionTrigger>
//                   <AccordionContent className="mt-5 px-6 space-y-4">
//                     {data?.productSupplier ? (
//                       <>
//                         {data.productSupplier.map((supplier, i) => (
//                           <div key={i} className="text-[12px] leading-[22px]">
//                             <h2 className="text-[#888888] text-[14px] mb-2">
//                               Contact {i + 1}
//                             </h2>
//                             <ul>
//                               <li>
//                                 <span className="text-[#888888]">Name</span>{" "}
//                                 {supplier.supplier_name}
//                               </li>
//                               <li>
//                                 <span className="text-[#888888]">Email</span>{" "}
//                                 {supplier.supplier_email}
//                               </li>
//                               <li>
//                                 <span className="text-[#888888]">Phone</span>{" "}
//                                 {supplier.supplier_contact}
//                               </li>
//                             </ul>
//                           </div>
//                         ))}
//                       </>
//                     ) : (
//                       <div className="text-center text-muted-foreground">
//                         --- No data ----
//                       </div>
//                     )}
//                   </AccordionContent>
//                 </AccordionItem>

//                 <AccordionItem value="item-3">
//                   <AccordionTrigger className="px-3 font-semibold">
//                     Contact Inventor
//                   </AccordionTrigger>
//                   <AccordionContent className="mt-5 px-6">
//                     {data?.productInventor ? (
//                       <>
//                         {data.productInventor.map((inventor, i) => (
//                           <div key={i} className="text-[12px] leading-[22px]">
//                             <h2 className="text-[#888888] text-[14px] mb-2">
//                               Contact {i + 1}
//                             </h2>
//                             <ul>
//                               <li>
//                                 <span className="text-[#888888]">Name</span>{" "}
//                                 {inventor.inventor_name}
//                               </li>
//                               <li>
//                                 <span className="text-[#888888]">Email</span>{" "}
//                                 {inventor.inventor_email}
//                               </li>
//                               <li>
//                                 <span className="text-[#888888]">Phone</span>{" "}
//                                 {inventor.inventor_contact}
//                               </li>
//                             </ul>
//                           </div>
//                         ))}
//                       </>
//                     ) : (
//                       <div className="text-center text-muted-foreground">
//                         --- No data ----
//                       </div>
//                     )}
//                   </AccordionContent>
//                 </AccordionItem>

//                 <AccordionItem value="item-4">
//                   <AccordionTrigger className="px-3 font-semibold">
//                     Usage Examples
//                   </AccordionTrigger>
//                   <AccordionContent className="mt-5 px-6">
//                     <ul>
//                       {data?.productExample?.map((example, i) => (
//                         <li key={i}>
//                           <RenderMedia
//                             media={example.instance_media}
//                             className="w-[40px] h-[40px]"
//                           />
//                           {example.instance_description}
//                         </li>
//                       ))}
//                     </ul>
//                   </AccordionContent>
//                 </AccordionItem>

//                 <AccordionItem value="item-5">
//                   <AccordionTrigger className="px-3 font-semibold">
//                     <div className="flex gap-2 items-center">
//                       <span>Gender Friendly</span>
//                       {data?.isGenderFriendly && (
//                         <FaCheckCircle className="text-mygreen" />
//                       )}
//                     </div>
//                   </AccordionTrigger>
//                   <AccordionContent className="mt-5 px-6">
//                     {data?.isGenderFriendly ? (
//                       <p>{data?.productGenderDescription}</p>
//                     ) : (
//                       <div className="text-center text-muted-foreground">
//                         --- No data ----
//                       </div>
//                     )}
//                   </AccordionContent>
//                 </AccordionItem>
//               </Accordion>
//             </div>

//             {data?.isGenderFriendly ? (
//               <div className="mt-10">
//                 <h2 className="text-2xl text-muted-foreground">
//                   Gender Friendly
//                 </h2>
//                 <button className="flex gap-x-1 items-center text-sm">
//                   Yes <FaCheckCircle />
//                 </button>
//               </div>
//             ) : (
//               <div className="mt-10"></div>
//             )}

//             <div className="w-full border shadow-sm rounded-md mt-5 h-[35px] flex items-center justify-between px-2">
//               <InnovationReactions innovationId={innovation_id} key={2} />

//               <div className="flex gap-x-4">
//                 <ShareButton link={`innovation/${innovation_id}`} />
//               </div>
//             </div>

//             {comments && (
//               <InnovationDiscussionForum
//                 innovationId={innovation_id}
//                 comments={comments}
//               />
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default InnovationPage;
