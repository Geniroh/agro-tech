"use client";
import React from "react";
import { Navbar } from "@/components/general/navbar";
import BreadcrumbP from "@/components/general/my-breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/current-user";
import { LuTrash2, LuUpload } from "react-icons/lu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InnovationProfile } from "./_components/innovation-profile";

const ProfilePage = () => {
  const user = useCurrentUser();

  console.log(user);

  return (
    <div>
      <Navbar />
      <BreadcrumbP
        fromHref="/"
        fromTitle="Back to Home"
        toHref="/profile"
        toTitle="Profile page"
      />

      <div className="w-full flex flex-col items-center gap-y-10">
        <Avatar className=" w-[126px] h-[126px]">
          <AvatarImage src={user?.image || undefined} alt="profile" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex gap-x-6">
          <Button variant="outline">
            Upload photo <LuUpload className="ml-2" />
          </Button>
          <Button
            variant="outline"
            className="text-destructive hover:text-destructive"
          >
            Delete photo <LuTrash2 className="ml-2" />
          </Button>
        </div>
      </div>

      <div className="mt-10 w-screen">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="innovations">My Innovation</TabsTrigger>
            <TabsTrigger value="post">My Post</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="innovations">
            <div className=" max-w-[600px] mx-auto">
              <InnovationProfile />
            </div>
          </TabsContent>
          <TabsContent value="post"></TabsContent>
          <TabsContent value="about"></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProfilePage;
