"use client";
import { Navbar } from "@/components/general/navbar";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChatCard } from "@/components/general/chat-card";
import { Capsule } from "@/components/general/capsule";
import { TagSelect } from "@/components/general/tag-select";
import { ReplyCard } from "@/components/general/reply-card";
import { FaPlus } from "react-icons/fa6";
import { ChatCard2 } from "@/components/auth/chat-card2";
import BreadcrumbP from "@/components/general/my-breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Laugh, XCircle, XCircleIcon } from "lucide-react";
import { IoSendSharp } from "react-icons/io5";
import { RiFolder2Fill } from "react-icons/ri";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/current-user";
import { getFirstName } from "@/utils/function";
import { toast, Toaster } from "sonner";
import axios from "axios";
import { message } from "antd";
import { ClipLoader } from "react-spinners";
import { CombinedReplyCard } from "@/components/discussionComp/combined-reply-card";

const DiscussionPage = () => {
  const [activeSection, setActiveSection] = useState<number>(1);
  const [topic, setTopic] = useState("");
  const [body, setBody] = useState("");
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [innovationDiscussion, setInnovationDiscussion] = useState<
    IInnovationDiscussion[]
  >([]);
  const [userDiscussion, setUserDiscussion] = useState<IUserDiscussion[]>([]);
  const [allDiscussion, setAllDiscussion] = useState<ICombinedDiscussion[]>([]);
  const user = useCurrentUser();

  const handleDiscussionCreate = async () => {
    const payload = {
      message: body,
      title: topic,
    };
    setBtnLoading(true);
    try {
      if (body == "" && topic == "") {
        message.error("Please fill in all field");
      } else {
        const { data } = await axios.post("api/v1/discussion", payload);
        message.success("Discussion started successfully");
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
    setBtnLoading(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<{
        userDiscussion: IUserDiscussion[];
        innovationDiscussion: IInnovationDiscussion[];
        all: ICombinedDiscussion[];
      }>("/api/v1/discussion");

      setInnovationDiscussion(data.innovationDiscussion);
      setUserDiscussion(data.userDiscussion);
      setAllDiscussion(data.all);

      console.log(data);
    } catch (error) {
      toast.error("Network error!");
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="w-full container h-full">
        <BreadcrumbP
          fromHref="/"
          fromTitle="Back to Home Page"
          toHref="/discussion"
          toTitle="Forum Page"
        />

        <h1 className="w-full text-center text-4xl font-playfair font-semibold my-10">
          Discussion Forum
        </h1>

        <div className="max-w-[700px] mx-auto">
          <div className="flex items-center gap-x-3 mb-5">
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
          <div className="max-w-[782px] max-h-[700px] mx-auto">
            <Dialog>
              <DialogTrigger asChild>
                <div className="bg-myoffwhie py-2 px-6 rounded-3xl w-full flex items-center">
                  <input
                    className="bg-transparent border-0 outline-none w-full"
                    placeholder="Create a discussion"
                    title="Start typing to start a discussion"
                  />
                  <div className="flex text-[14px] gap-x-2">
                    <button className="p-2 flex items-center justify-center rounded-full hover:bg-white border">
                      <RiFolder2Fill />
                    </button>
                    <button className="p-2 flex items-center justify-center rounded-full hover:bg-white border">
                      <IoSendSharp />
                    </button>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[700px] max-h-[700px]">
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
                  {!btnLoading && (
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
                    disabled={btnLoading}
                  >
                    {btnLoading ? (
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
                    ? "text-white bg-black"
                    : "bg-transparent text-black"
                } py-1 px-6 rounded-3xl`}
                onClick={() => setActiveSection(1)}
              >
                All
              </button>
              <button
                className={`${
                  activeSection == 2
                    ? "text-white bg-black"
                    : "bg-transparent text-black"
                } py-1 px-6 rounded-3xl`}
                onClick={() => setActiveSection(2)}
              >
                Innovations
              </button>
              <button
                className={`${
                  activeSection == 3
                    ? "text-white bg-black"
                    : "bg-transparent text-black"
                } py-1 px-6 rounded-3xl`}
                onClick={() => setActiveSection(3)}
              >
                Discussion
              </button>
            </div>
            <div>
              {/* <TagSelect name="Filter By" options={selectList} /> */}
            </div>
          </div>

          {allDiscussion.map((discussion, i) => (
            <CombinedReplyCard discussion={discussion} />
          ))}
          <div className="mt-5 pb-5 border-b">
            <ReplyCard
              username="Innovation title"
              id={"1"}
              postedby="Posted 2 hours ago"
            />
          </div>
          <div className="mt-5 pb-5 border-b">
            <ReplyCard
              username="Username"
              id={"1"}
              postedby="Posted 2 hours ago"
              message="What do you people think of value chain?"
            />
          </div>
          <div className="mt-5 pb-5 border-b">
            <ReplyCard
              username="Innovation title"
              id={"1"}
              postedby="Posted 2 hours ago"
            />
          </div>
          <div className="mt-5 pb-5 border-b">
            <ReplyCard
              username="Username"
              id={"1"}
              postedby="Posted 2 hours ago"
            />
          </div>
          <div className="mt-5 pb-5 border-b">
            <ReplyCard
              username="Innovation title"
              id={"1"}
              postedby="Posted 2 hours ago"
            />
          </div>
        </div>

        <div className="my-[100px] flex items-center justify-center">
          <button className="flex gap-3 items-center bg-myoffwhie/50 text-mypurple px-3 py-1 rounded-2xl hover:text-white hover:bg-mypurple">
            More <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscussionPage;
