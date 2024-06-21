"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Capsule } from "@/components/general/capsule";
import { Upload, X } from "lucide-react";
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
import NoContent from "@/components/loaders/no-content";
import { ReactionButtons } from "@/components/general/reaction-buttons";

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
      console.log(data);
      setComments(comments.comments);
    } catch (error) {
      setError("Network Error, please try again!");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData(innovation_id);
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col space-y-3 w-full container mb-5">
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
      <NoContent
        message={` Looks like there was a problem getting innovation. For more
        information, please contact @help`}
      />
    );
  }

  return (
    <>
      {!data ? (
        <NoContent
          message={` Looks like there was a problem getting innovation. For more
        information, please contact @help`}
        />
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
              <div className="mx-4 hidden md:block">|</div>
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
            <div className="flex flex-wrap items-center gap-x-2 justify-center max-w-[900px] mt-6 md:mt-3 text-sm tracking-wide mx-auto gap-y-3">
              <div className="flex items-center">
                <span className="text-muted-foreground mr-2">Value Chain:</span>
                <span className="flex gap-x-2">
                  {data?.productChain.map((chain, index) => (
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
                  {data?.productUse.split(",").map((use, index) => (
                    <Capsule key={index}>{use}</Capsule>
                  ))}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full border shadow-sm rounded-md mt-5 max-w-[1000px] mx-auto h-[35px] flex items-center justify-between px-2">
            <ReactionButtons
              likes={data?.likes}
              dislikes={data?.dislikes}
              replies={data?.discussion?.length || 0}
              type="innovation"
            />

            <div className="flex gap-x-2 md:gap-x-4">
              <ShareButton link={`innovation/${innovation_id}`} />

              <button
                className="flex items-center text-xs"
                onClick={() => router.push("/upload")}
              >
                <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
                  <Upload size={13} onClick={() => router.push("/upload")} />
                </span>
                <span>Upload Innovation</span>
              </button>
            </div>
          </div>

          <div className="mt-16">
            {!data?.productMedia[0].url ? (
              <div className="text-center text-muted-foreground h-[100px] flex justify-center items-center">
                --- No data ----
              </div>
            ) : (
              <RenderMedia
                media={data?.productMedia[0]}
                className="w-full max-w-[1000px] mx-auto h-[450px] object-cover"
                key={data?.productMedia[0].name}
              />
            )}
          </div>

          <div>
            <div className="grid grid-cols-4 gap-6 mt-10">
              {data?.productMedia ? (
                data.productMedia.map((media, i) => (
                  <>
                    {media.url && (
                      <RenderMedia
                        media={media}
                        key={i}
                        className="rounded-md h-[95px] w-[68px] md:h-[120px] md:w-full lg:h-[200px]"
                      />
                    )}
                  </>
                ))
              ) : (
                <div className="text-center text-muted-foreground">
                  --- No data ----
                </div>
              )}
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
                    {data?.productUse ? (
                      <ul>
                        {data?.productUse.split(",").map((use, i) => (
                          <li key={i}>{use}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        --- No data ----
                      </div>
                    )}
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
                          <div
                            key={i}
                            className="text-[12px] leading-[22px] mb-3"
                          >
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
                      <div className="text-center text-muted-foreground h-[100px] flex justify-center items-center">
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
                          <div
                            key={i}
                            className="text-[12px] leading-[22px] mb-3"
                          >
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
                    {data?.productExample ? (
                      <ul>
                        {data?.productExample?.map((example, i) => (
                          <li key={i}>
                            <RenderMedia
                              media={example.instance_media[0]}
                              key={i}
                              className="w-[40px] h-[40px]"
                            />
                            {example.instance_description}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        --- No data ----
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger className="px-3 font-semibold">
                    HSE Guideline
                  </AccordionTrigger>
                  <AccordionContent className="mt-5 px-6">
                    {data?.productGuidelines ? (
                      <ul>
                        {data?.productGuidelines?.map((guideline, i) => (
                          <li key={i}>{guideline.name}</li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-center text-muted-foreground">
                        --- No data ----
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger className="px-3 font-semibold">
                    <div className="flex gap-2 items-center">
                      <span>Gender Friendly</span>
                      {data?.isGenderFriendly ? (
                        <FaCheckCircle className="text-mygreen" />
                      ) : (
                        <X color="red" />
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

            {/* <div className="w-full border shadow-sm rounded-md mt-5 h-[35px] flex items-center justify-between px-2">
              <InnovationReactions innovationId={innovation_id} key={2} />

              <div className="flex gap-x-4">
                <ShareButton link={`innovation/${innovation_id}`} />
              </div>
            </div> */}

            {/* {comments && (
              <InnovationDiscussionForum
                innovationId={innovation_id}
                comments={comments}
              />
            )} */}
          </div>
        </div>
      )}
    </>
  );
};

export default InnovationPage;
