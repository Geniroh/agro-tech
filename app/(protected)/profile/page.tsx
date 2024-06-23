"use client";
import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/general/navbar";
import BreadcrumbP from "@/components/general/my-breadcrumb";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/current-user";
import { LuTrash2, LuUpload } from "react-icons/lu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InnovationProfile } from "./_components/innovation-profile";
import { UserDetailsForm } from "./_components/user-details-form";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ImgCrop from "antd-img-crop";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { ClipLoader } from "react-spinners";

const ProfilePage = () => {
  const user = useCurrentUser();
  const [profileUser, setProfileUser] = useState<IUser>();
  const [openDeletePic, setOpenDeletePic] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const updateProfilePic = async (url: string) => {
    try {
      const { data } = await axios.put("/api/v1/user/pic", { url });
      message.success("Profile updated successfully");
    } catch (error) {
      message.error("Profile update failed");
    }
  };

  const handleProfileDelete = async () => {
    setLoading(true);
    try {
      const { data } = await axios.delete<{ user: IUser }>("/api/v1/user/pic");
      setProfileUser(data.user);
      setOpenDeletePic(!openDeletePic);
    } catch (error) {
      message.error("Operation failed");
      setOpenDeletePic(!openDeletePic);
    }
    setLoading(false);
  };

  const props: UploadProps = {
    name: "file",
    action: "/api/v1/upload",
    showUploadList: { showRemoveIcon: false },
    onChange(info) {
      if (info.file.status === "uploading") {
        setIsUploading(true);
      }
      if (info.file.status === "done") {
        console.log(info.file.response.files[0].url);
        if (info.file.response && info.file.response) {
          const imageUrl = info.file.response.files[0].url;
          updateProfilePic(imageUrl);
        } else {
          message.error("Failed to upload file");
        }
        setIsUploading(false);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
        setIsUploading(false);
      }
    },
  };

  const getProfilePic = async () => {
    try {
      const { data } = await axios.get<{ user: IUser }>("/api/v1/user/pic");
      setProfileUser(data.user);
    } catch (error) {
      message.error("Network Error");
    }
  };

  useEffect(() => {
    getProfilePic();
  }, []);

  return (
    <div className="pb-20">
      <Navbar />
      <BreadcrumbP
        fromHref="/"
        fromTitle="Back to Home"
        toHref="/profile"
        toTitle="Profile page"
      />

      <div className="w-full flex flex-col items-center gap-y-10">
        <Avatar className=" w-[126px] h-[126px]">
          <AvatarImage src={profileUser?.image} alt="profile" />
          <AvatarFallback>
            <CgProfile size={30} />
          </AvatarFallback>
        </Avatar>
        <div className="flex gap-x-6">
          <ImgCrop rotationSlider>
            <Upload {...props} maxCount={1}>
              <Button variant="outline" className="flex items-center gap-2">
                {" "}
                <UploadOutlined />
                Click to Upload
              </Button>
              {isUploading && "Uploading..."}
            </Upload>
          </ImgCrop>
          <Button
            variant="outline"
            className="text-destructive hover:text-destructive"
            onClick={() => setOpenDeletePic(!openDeletePic)}
          >
            Delete photo <LuTrash2 className="ml-2" />
          </Button>
        </div>
      </div>

      <div className="mt-10 w-screen">
        <Tabs defaultValue="account" className="w-full">
          <TabsList
            className="grid grid-cols-3 w-full"
            defaultValue="innovations"
          >
            <TabsTrigger value="innovations">My Innovation</TabsTrigger>
            <TabsTrigger value="post">My Post</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="innovations">
            <div className=" max-w-[782px] mx-auto">
              <InnovationProfile />
            </div>
          </TabsContent>
          <TabsContent value="post"></TabsContent>
          <TabsContent value="about">
            <div className=" max-w-[782px] mx-auto">
              <UserDetailsForm />
            </div>
          </TabsContent>
        </Tabs>

        <Dialog open={openDeletePic}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete your profile picture?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex items-center gap-3">
              <Button variant="destructive" onClick={handleProfileDelete}>
                {loading ? <ClipLoader /> : "Yes"}
              </Button>
              <Button
                variant="default"
                className="bg-mygreen"
                onClick={() => setOpenDeletePic(!openDeletePic)}
              >
                No
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ProfilePage;
