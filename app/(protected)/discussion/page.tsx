"use client";
import { Navbar } from "@/components/general/navbar";
import React, { useState } from "react";
import Link from "next/link";
import { ChatCard } from "@/components/general/chat-card";
import { Capsule } from "@/components/general/capsule";
import { TagSelect } from "@/components/general/tag-select";
import { ReplyCard } from "@/components/general/reply-card";
import { FaPlus } from "react-icons/fa6";
import { ChatCard2 } from "@/components/auth/chat-card2";

const selectList: { name: string; value: string }[] = [
  {
    name: "first item",
    value: "first",
  },
  {
    name: "second item",
    value: "second",
  },
  {
    name: "third item",
    value: "third",
  },
];

const DiscussionPage = () => {
  const [activeSection, setActiveSection] = useState<number>(1);
  return (
    <div>
      <Navbar />

      <div className="w-full container h-full">
        <div className="flex justify-center items-center text-sm gap-x-2 my-10 font-semibold">
          <Link href="/">
            <span className="text-[#888888]">Back to Home Page</span>
          </Link>
          /<span>Forum Page</span>
        </div>

        <h1 className="w-full text-center text-4xl font-playfair font-semibold my-10">
          Disccussion Forum
        </h1>

        <div className="max-w-[700px] mx-auto">
          <ChatCard2 />
          <ChatCard
            username={"username"}
            email={"test@test.com"}
            id={"1"}
            placeholder="Create A Discussion"
          />

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
