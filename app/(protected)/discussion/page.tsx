"use client";
import React, { useState } from "react";
import BreadcrumbP from "@/components/general/my-breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { IoSendSharp } from "react-icons/io5";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/current-user";
import { getFirstName } from "@/utils/function";
import { message } from "antd";
import { ClipLoader } from "react-spinners";
import { CombinedReplyCard } from "@/components/discussionComp/combined-reply-card";
import { InnovationReplyCard } from "@/components/discussionComp/innovation-reply-card";
import { UserReplyCard } from "@/components/discussionComp/user-reply-card";
import { useGetAllDiscussion } from "@/hooks/useDiscussionData";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddUserDiscussion } from "@/hooks/useAddDiscussion";

const DiscussionPage = () => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");
  const [open, setOpen] = useState(false);
  const [innovationDiscussion, setInnovationDiscussion] = useState<
    IInnovationDiscussion[]
  >([]);
  const [userDiscussion, setUserDiscussion] = useState<IUserDiscussion[]>([]);
  const [allDiscussion, setAllDiscussion] = useState<ICombinedDiscussion[]>([]);
  const user = useCurrentUser();

  const handleGetAllDiscussionSuccess = (data: {
    userDiscussion: IUserDiscussion[];
    innovationDiscussion: IInnovationDiscussion[];
    all: ICombinedDiscussion[];
  }) => {
    setInnovationDiscussion(data.innovationDiscussion);
    setUserDiscussion(data.userDiscussion);
    setAllDiscussion(data.all);
  };

  const onError = (err: any) => {
    message.error("Network Error!");
  };

  const { isLoading, refetch } = useGetAllDiscussion(
    handleGetAllDiscussionSuccess,
    onError
  );
  const { mutate: startDiscussion, isLoading: isLoadingDiscussion } =
    useAddUserDiscussion();

  const handleDiscussionCreate = async () => {
    const payload = {
      message: body,
      title: topic,
    };
    try {
      if (body == "" && topic == "") {
        message.error("Please fill in all fields");
      } else {
        startDiscussion(payload, {
          onSuccess: (data) => {
            message.success("Discussion started successfully");
            refetch();
            setOpen(false);
          },
          onError: () => {
            message.error("Failed to start a discussion");
          },
        });
      }
    } catch (error) {}
  };

  return (
    <div>
      <div className="w-full container h-full pb-20">
        <BreadcrumbP
          fromHref="/"
          fromTitle="Back to Home Page"
          toHref="/discussion"
          toTitle="Forum Page"
        />

        <h1 className="w-full text-center text-2xl md:text-4xl font-playfair font-semibold my-10">
          Discussion Forum
        </h1>

        <div className="max-w-[700px] mx-auto">
          <div className="flex items-center gap-x-3 mb-5">
            {user?.image ? (
              <div
                className="w-[40px] h-[40px] rounded-full bg-center bg-cover bg-no-repeat"
                style={{ backgroundImage: `url(${user?.image})` }}
              ></div>
            ) : (
              <Avatar className=" w-[40px] h-[40px]">
                <AvatarImage src={user?.image || ""} alt="profile" />
                <AvatarFallback className="bg-[#9430E3] text-white">
                  {getFirstName(user?.name)[0]}
                </AvatarFallback>
              </Avatar>
            )}
            <div>
              <h1 className="text-sm font-semibold text-myblack">
                {user?.name}
              </h1>
            </div>
          </div>
          <div className="max-w-[782px] max-h-[700px] mx-auto">
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <div className="bg-myoffwhie py-2 px-6 rounded-3xl w-full flex items-center">
                  <input
                    className="bg-transparent border-0 outline-none w-full"
                    placeholder="Create a discussion"
                    title="Start typing to start a discussion"
                  />
                  <div className="flex text-[14px] gap-x-2">
                    <button className="p-2 flex items-center justify-center text-mygreen rounded-full hover:bg-white border">
                      <IoSendSharp />
                    </button>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[300px] md:max-w-[700px] max-h-[700px] mx-auto">
                <DialogHeader>
                  <DialogTitle className="font-playfair text-[14px] md:text-[24px] leading-[20px] md:leading-[36px] text-[#888888]">
                    Create A Discussion
                  </DialogTitle>
                  <DialogDescription>
                    <div className="flex items-center gap-x-3 ">
                      {user?.image ? (
                        <Image
                          src={user?.image || ""}
                          className="rounded-full"
                          alt=""
                          width={40}
                          height={40}
                        />
                      ) : (
                        <Avatar className=" w-[40px] h-[40px]">
                          <AvatarImage src={user?.image || ""} alt="profile" />
                          <AvatarFallback className="bg-[#9430E3] text-white">
                            {getFirstName(user?.name)[0]}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div>
                        <h1 className="text-sm font-semibold text-myblack">
                          {user?.name}
                        </h1>
                      </div>
                    </div>
                  </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-y-4">
                  <input
                    className="outline-none border-0 border-b pb-3 w-full placeholder:text-muted-foreground text-[14px] placeholder:text-[14px] leading-[24px] placeholder:text-[#888888]"
                    placeholder="What's the topic of Discussion"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />

                  <div>
                    <textarea
                      className="h-[150px] w-full border-0 outline-none border-b placeholder:text-muted-foreground text-[14px] placeholder:text-[14px] leading-[24px] placeholder:text-[#888888]"
                      placeholder="Type in body of Discussion here."
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  {!isLoadingDiscussion && (
                    <DialogClose>
                      <Button
                        variant="outline"
                        className="flex gap-2 items-center text-[12px] rounded-2xl"
                      >
                        Cancel
                      </Button>
                    </DialogClose>
                  )}
                  <Button
                    variant="outline"
                    className="flex gap-2 items-center text-[12px] rounded-2xl"
                    onClick={handleDiscussionCreate}
                    disabled={isLoadingDiscussion}
                  >
                    {isLoadingDiscussion ? (
                      <ClipLoader size={13} />
                    ) : (
                      <>
                        Post <IoSendSharp />
                      </>
                    )}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="pt-10 mt-10 pb-4 border-b flex justify-between">
            <div className="flex gap-4">
              <button
                className={`${
                  activeSection == 1
                    ? "text-white bg-mygreen"
                    : "bg-transparent text-black"
                } py-1 px-6 rounded-3xl`}
                onClick={() => setActiveSection(1)}
              >
                All
              </button>
              <button
                className={`${
                  activeSection == 2
                    ? "text-white bg-mygreen"
                    : "bg-transparent text-black"
                } py-1 px-6 rounded-3xl`}
                onClick={() => setActiveSection(2)}
              >
                Innovations
              </button>
              <button
                className={`${
                  activeSection == 3
                    ? "text-white bg-mygreen"
                    : "bg-transparent text-black"
                } py-1 px-6 rounded-3xl`}
                onClick={() => setActiveSection(3)}
              >
                Discussion
              </button>
            </div>
          </div>

          {isLoading ? (
            <div>
              <Skeleton className="w-full min-h-[300px]" />
            </div>
          ) : (
            <>
              {activeSection === 1 && (
                <>
                  {allDiscussion.map((discussion, i) => (
                    <CombinedReplyCard discussion={discussion} key={i} />
                  ))}
                </>
              )}

              {activeSection === 2 && (
                <>
                  {innovationDiscussion.map((discussion, i) => (
                    <InnovationReplyCard discussion={discussion} key={i} />
                  ))}
                </>
              )}

              {activeSection === 3 && (
                <>
                  {userDiscussion.map((discussion, i) => (
                    <UserReplyCard discussion={discussion} key={i} />
                  ))}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DiscussionPage;
