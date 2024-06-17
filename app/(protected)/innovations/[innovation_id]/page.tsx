"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Capsule } from "@/components/general/capsule";
import { Upload } from "lucide-react";
import { VideoPlayer } from "@/components/general/video-player";
import { FaCheckCircle, FaPhone } from "react-icons/fa";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { ForumChats } from "@/components/general/forum-chats";
import { useRouter, useParams } from "next/navigation";
import { RenderMedia } from "@/components/general/render-media";
import { ShareButton } from "@/components/general/share-button";
import { InnovationReactions } from "@/components/innovationComp/innovation-reaction-button";
import { InnovationDiscussionForum } from "@/components/innovationComp/innovation-discussion-form";
import { IoPlay } from "react-icons/io5";
import BreadcrumbP from "@/components/general/my-breadcrumb";
import { Navbar } from "@/components/general/navbar";

const InnovationPage = () => {
  const router = useRouter();
  const params = useParams<{ innovation_id: string }>();
  const { innovation_id } = params;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<IInnovationType>();
  const [comments, setComments] = useState<IInnovationComment[]>();

  const fetchData = async (id: string) => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await axios.get<IInnovationType>(
        `/api/v1/innovation/${id}`
      );
      const { data: comments } = await axios.get<{
        message: string;
        comments: IInnovationComment[];
      }>(`/api/v1/innovation/${innovation_id}/discussion`);

      setData(data);
      setComments(comments.comments);
    } catch (error) {
      setError("Network Error, please try again!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(innovation_id);
  });

  if (loading) {
    return (
      <div className="flex flex-col space-y-3 w-full container">
        <Skeleton className="h-[300px] w-full mt-10" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <section className="flex items-center h-full sm:p-16 dark:bg-gray-50 dark:text-gray-800">
        <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-40 h-40 dark:text-gray-400"
          >
            <path
              fill="currentColor"
              d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
            ></path>
            <rect
              width="176"
              height="32"
              x="168"
              y="320"
              fill="currentColor"
            ></rect>
            <polygon
              fill="currentColor"
              points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
            ></polygon>
            <polygon
              fill="currentColor"
              points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
            ></polygon>
          </svg>
          <p className="text-md">
            Looks like there was a problem getting innovation. For more
            information, please contact @help
          </p>
          <Link
            href="/"
            className="text-mygreen font-semibold hover:text-mygreen/70"
          >
            Back to home page
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <Navbar />
      {!data ? (
        <section className="flex items-center h-full sm:p-16 dark:bg-gray-50 dark:text-gray-800">
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-40 h-40 dark:text-gray-400"
            >
              <path
                fill="currentColor"
                d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"
              ></path>
              <rect
                width="176"
                height="32"
                x="168"
                y="320"
                fill="currentColor"
              ></rect>
              <polygon
                fill="currentColor"
                points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"
              ></polygon>
              <polygon
                fill="currentColor"
                points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"
              ></polygon>
            </svg>
            <p className="text-md">
              Looks like there was a problem getting innovation. For more
              information, please contact @help
            </p>
            <Link
              href="/"
              className="text-mygreen font-semibold hover:text-mygreen/70"
            >
              Back to home page
            </Link>
          </div>
        </section>
      ) : (
        <div className="container pb-20">
          <BreadcrumbP
            fromHref="/"
            fromTitle="Back to Home"
            toHref=""
            toTitle="Upload Invention Page"
          />

          <div className="w-full">
            <div>
              <h1 className="w-full text-center text-4xl font-playfair font-semibold">
                {data?.productName}
              </h1>
            </div>
            <div className="flex flex-wrap items-center justify-center max-w-[1200px] mt-7 text-sm tracking-wide mx-auto gap-y-2">
              <div className="flex">
                <span className="text-muted-foreground mr-2">Inventor:</span>
                <span className="flex gap-1 flex-wrap">
                  {data?.productInventor && data?.productInventor.length > 0 ? (
                    <>
                      {data?.productInventor.map((inventor, i) => (
                        <span key={i}>{inventor.inventor_name}</span>
                      ))}
                    </>
                  ) : (
                    ""
                  )}
                </span>
              </div>
              <div className="mx-4">|</div>
              <div>
                <span className="text-muted-foreground mr-2">
                  Year Invented:
                </span>
                <span>{data?.yearInvented}</span>
              </div>
              <div className="mx-4">|</div>
              <div>
                <span className="text-muted-foreground mr-2">Country:</span>
                <span>{data?.country}</span>
              </div>
              <div className="mx-4">|</div>
              <div>
                <span className="text-muted-foreground mr-2">Cost:</span>
                <span>{data?.cost}</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center max-w-[900px] mt-6 md:mt-3 text-sm tracking-wide mx-auto gap-y-3">
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">Value Chain:</span>
                <span className="flex gap-x-2">
                  {data?.productChain.split(" ").map((chain, index) => (
                    <Capsule key={index}>{chain}</Capsule>
                  ))}
                </span>
              </div>
              <div className="mx-4 hidden md:block">|</div>
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">
                  Implementation Phase:
                </span>
                <span className="flex gap-x-2">
                  <Capsule>{data?.productPhase}</Capsule>
                </span>
              </div>
              <div className="mx-4 hidden md:block">|</div>
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">Usage:</span>
                <span className="flex gap-x-2">
                  {data?.productUse.map((use, index) => (
                    <Capsule key={index}>{use}</Capsule>
                  ))}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full border shadow-sm rounded-md mt-5 max-w-[1000px] mx-auto h-[35px] flex items-center justify-between px-2">
            <InnovationReactions innovationId={innovation_id} />

            <div className="flex gap-x-4">
              <ShareButton link={`innovation/${innovation_id}`} />

              <button
                className="flex items-center text-xs"
                onClick={() => router.push("/upload")}
              >
                <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
                  <Upload size={13} />
                </span>
                <span>Upload Innovation</span>
              </button>
            </div>
          </div>

          <div className="mt-16">
            {!data?.productMedia[0].url ? (
              <div className="w-full h-[380px] bg-[#f2f2f2] flex justify-center items-center">
                <IoPlay className="text-4xl cursor-pointer" />
              </div>
            ) : (
              <RenderMedia
                media={data?.productMedia[0]}
                className="w-full h-[380px]"
                key={data?.productMedia[0].name}
              />
            )}
          </div>

          <div>
            <div className="grid grid-cols-4 gap-6 mt-10">
              {data?.productMedia.map((media, i) => (
                <RenderMedia
                  media={media}
                  key={i}
                  className="rounded-md h-[95px] w-[68px] md:h-[120px] md:w-full lg:h-[200px]"
                />
              ))}
            </div>

            <div className="mt-10">
              <h2 className="text-2xl text-muted-foreground">Description</h2>
              <p className="leading-8">{data?.productDescription}</p>
            </div>

            <div className="mt-10">
              <h2 className="text-2xl text-muted-foreground">
                Additional Info
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="px-3 font-semibold">
                    How to Use
                  </AccordionTrigger>
                  <AccordionContent className="mt-5 px-6">
                    <ul>
                      {data?.productUse.map((use, i) => (
                        <li key={i}>{use}</li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger className="px-3 font-semibold">
                    Contact Supplier
                  </AccordionTrigger>
                  <AccordionContent className="mt-5 px-6 space-y-4">
                    {data?.productSupplier ? (
                      <>
                        {data.productSupplier.map((supplier, i) => (
                          <div key={i} className="text-[12px] leading-[22px]">
                            <h2 className="text-[#888888] text-[14px] mb-2">
                              Contact {i + 1}
                            </h2>
                            <ul>
                              <li>
                                <span className="text-[#888888]">Name</span>{" "}
                                {supplier.supplier_name}
                              </li>
                              <li>
                                <span className="text-[#888888]">Email</span>{" "}
                                {supplier.supplier_email}
                              </li>
                              <li>
                                <span className="text-[#888888]">Phone</span>{" "}
                                {supplier.supplier_contact}
                              </li>
                            </ul>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        --- No data ----
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger className="px-3 font-semibold">
                    Contact Inventor
                  </AccordionTrigger>
                  <AccordionContent className="mt-5 px-6">
                    {data?.productInventor ? (
                      <>
                        {data.productInventor.map((inventor, i) => (
                          <div key={i} className="text-[12px] leading-[22px]">
                            <h2 className="text-[#888888] text-[14px] mb-2">
                              Contact {i + 1}
                            </h2>
                            <ul>
                              <li>
                                <span className="text-[#888888]">Name</span>{" "}
                                {inventor.inventor_name}
                              </li>
                              <li>
                                <span className="text-[#888888]">Email</span>{" "}
                                {inventor.inventor_email}
                              </li>
                              <li>
                                <span className="text-[#888888]">Phone</span>{" "}
                                {inventor.inventor_contact}
                              </li>
                            </ul>
                          </div>
                        ))}
                      </>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        --- No data ----
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger className="px-3 font-semibold">
                    Usage Examples
                  </AccordionTrigger>
                  <AccordionContent className="mt-5 px-6">
                    <ul>
                      {data?.productExample?.map((example, i) => (
                        <li key={i}>
                          <RenderMedia
                            media={example.instance_media}
                            className="w-[40px] h-[40px]"
                          />
                          {example.instance_description}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="px-3 font-semibold">
                    <div className="flex gap-2 items-center">
                      <span>Gender Friendly</span>
                      {data?.isGenderFriendly && (
                        <FaCheckCircle className="text-mygreen" />
                      )}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="mt-5 px-6">
                    {data?.isGenderFriendly ? (
                      <p>{data?.productGenderDescription}</p>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        --- No data ----
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {data?.isGenderFriendly ? (
              <div className="mt-10">
                <h2 className="text-2xl text-muted-foreground">
                  Gender Friendly
                </h2>
                <button className="flex gap-x-1 items-center text-sm">
                  Yes <FaCheckCircle />
                </button>
              </div>
            ) : (
              <div className="mt-10"></div>
            )}

            <div className="w-full border shadow-sm rounded-md mt-5 h-[35px] flex items-center justify-between px-2">
              <InnovationReactions innovationId={innovation_id} key={2} />

              <div className="flex gap-x-4">
                <ShareButton link={`innovation/${innovation_id}`} />
              </div>
            </div>

            {comments && (
              <InnovationDiscussionForum
                innovationId={innovation_id}
                comments={comments}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default InnovationPage;
