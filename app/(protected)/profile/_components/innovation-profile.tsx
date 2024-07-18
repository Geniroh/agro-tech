import React, { useEffect, useState } from "react";
import { TagSelect } from "@/components/general/tag-select";
import { useGetUserInnovation } from "@/hooks/useUserProfileData";
import { DateDifference } from "@/components/general/date-diff-calculator";
import { MessageSquareText, ThumbsDown, ThumbsUp } from "lucide-react";
import { Button, Form, Input, message } from "antd";
import { useRouter } from "next/navigation";
import { useAppContext } from "@/context/AppContext";
import { UserInnovationSkeleton } from "@/components/skeletons/user-innovation-skeleton";
import { CiEdit } from "react-icons/ci";
import { MdEditOff } from "react-icons/md";
import { useSession } from "next-auth/react";
import { sendEditRequest } from "@/actions/innovationEmails";
import axiosInstance from "@/utils/axiosInstance";

const InnovationProfileCard = ({
  innovation,
}: {
  innovation: IInnovationType;
}) => {
  const [sendEdit, setSendEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const session = useSession();

  const handleNavigation = () => {
    if (innovation.status === "approved") {
      router.push(`/innovations/${innovation.id}`);
    }
  };

  const [form] = Form.useForm();

  const handleEditSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const userEmail = session?.data?.user.email;
      if (userEmail) {
        await sendEditRequest(
          userEmail,
          innovation.productName,
          values.message
        );
        const { data } = await axiosInstance.post("/edit", {
          email: userEmail,
          innovationId: innovation.id,
          title: innovation.productName,
        });

        if (data) {
          message.success("Request sent!");
        }

        setSendEdit(false);
      }
    } catch (error) {
      message.error("Request failed");
    }
    setLoading(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-3 relative">
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
          <div className="flex flex-col items-start md:items-center gap-3 ">
            <div
              className="flex items-center gap-3 cursor-pointer"
              onClick={handleNavigation}
            >
              <div
                className="w-[32px] h-[32px] rounded-[8px] flex justify-center items-center text-white bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${innovation.productMedia[0].url})`,
                }}
              ></div>
              <div>{innovation?.productName}</div>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground text-[14px]">
              Posted <DateDifference date={innovation?.createdAt} />
            </div>
          </div>

          <div className="">
            {innovation?.status === "approved" && (
              <div className="flex items-center gap-4">
                <div className="cursor-pointer">
                  {sendEdit ? (
                    <MdEditOff size={18} onClick={() => setSendEdit(false)} />
                  ) : (
                    <CiEdit size={18} onClick={() => setSendEdit(true)} />
                  )}
                </div>
                <div className="bg-[#E6FEED] text-mygreen text-xs px-[15px] py-[5px] rounded-xl">
                  Live
                </div>
              </div>
            )}
            {innovation?.status === "pending" && (
              <div className="bg-[#F6EDFD] text-mygreen text-xs px-[15px] py-[5px] rounded-xl">
                Pending Approval
              </div>
            )}
            {innovation?.status === "rejected" && (
              <div className="bg-[#CCCCCC] text-black text-xs px-[15px] py-[5px] rounded-xl">
                Pending Approval
              </div>
            )}
          </div>
        </div>

        <div className={`${sendEdit ? "hidden" : "flex"}`}>
          {innovation?.productDescription}
        </div>

        {innovation?.status === "approved" && (
          <div
            className={`flex gap-x-2 md:gap-x-4 ${
              sendEdit ? "hidden" : "flex"
            }`}
          >
            <>
              <button className="flex items-center text-xs">
                <span
                  className={`p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center transition-transform`}
                >
                  <ThumbsUp size={13} />
                </span>
                <span>{innovation?.likes}</span>
              </button>

              <button className="flex items-center text-xs">
                <span
                  className={`p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center transition-transform`}
                >
                  <ThumbsDown size={13} />
                </span>
                <span>{innovation?.dislikes}</span>
              </button>

              <button className="flex items-center text-xs">
                <span className="p-2 rounded-full hover:bg-[#f2f2f2] flex justify-center items-center">
                  <MessageSquareText size={13} />
                </span>
                <span>{innovation?.comments?.length}</span>
              </button>
            </>
          </div>
        )}

        {sendEdit && (
          <Form
            layout="vertical"
            form={form}
            onFinishFailed={() => message.error("Please enter request details")}
          >
            <Form.Item
              label="Please can you describe why you will like to edit this innovation"
              name="message"
              rules={[
                {
                  required: true,
                  message: "Please enter a short request detail",
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <span>
              Please note that each edit request detail will be verified by
              StavMia and approval details will be sent to your email
            </span>
            <div className="w-full mt-2 flex justify-end">
              <Button
                shape="round"
                type="primary"
                loading={loading}
                onClick={handleEditSubmit}
              >
                Send
              </Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};

export const InnovationProfile = () => {
  const { userInnovation, setUserInnovation } = useAppContext();
  const [activeSection, setActiveSection] = useState<number>(1);
  const [allInnovation, setAllInnovation] = useState<IInnovationType[]>([]);
  const [approvedInnovation, setApprovedInnovation] = useState<
    IInnovationType[]
  >([]);
  const [pendingInnovation, setPendingInnovation] = useState<IInnovationType[]>(
    []
  );

  useEffect(() => {
    setAllInnovation(userInnovation);
    const approved = userInnovation.filter(
      (innovation) => innovation.status === "approved"
    );
    const pending = userInnovation.filter(
      (innovation) => innovation.status === "pending"
    );
    setApprovedInnovation(approved);
    setPendingInnovation(pending);
  }, [userInnovation]);

  const handleGetSuccess = (data: IInnovationType[]) => {
    setUserInnovation(data);
  };

  const handleGetError = (err: any) => {
    message.error("Network Error!");
  };

  const { isLoading } = useGetUserInnovation(handleGetSuccess, handleGetError);

  if (isLoading) {
    return <UserInnovationSkeleton />;
  }

  return (
    <div>
      <div className="mt-10 pb-4 border-b flex justify-between">
        <div className="flex gap-2 md:gap-4">
          <button
            className={`${
              activeSection == 1
                ? "text-white bg-mygreen"
                : "bg-transparent text-black"
            } py-0 px-3 md:py-1 md:px-6 rounded-3xl text-[14px]`}
            onClick={() => setActiveSection(1)}
          >
            All
          </button>
          <button
            className={`${
              activeSection == 2
                ? "text-white bg-mygreen"
                : "bg-transparent text-black"
            } py-1 px-6 rounded-3xl text-[14px]`}
            onClick={() => setActiveSection(2)}
          >
            Approved
          </button>
          <button
            className={`${
              activeSection == 3
                ? "text-white bg-mygreen"
                : "bg-transparent text-black"
            } py-1 px-6 rounded-3xl text-[14px]`}
            onClick={() => setActiveSection(3)}
          >
            Pending Approval
          </button>
        </div>
        <div className="hidden md:flex">
          <TagSelect name="Filter By" options={["Recent", "Older"]} />
        </div>
      </div>

      <div className="mt-10 space-y-6">
        {activeSection === 1 && (
          <>
            {allInnovation.length > 0 ? (
              <>
                {allInnovation.map((innovation) => (
                  <InnovationProfileCard
                    innovation={innovation}
                    key={innovation.id}
                  />
                ))}
              </>
            ) : (
              <div className="w-full flex justify-center items-center min-h-[150px]">
                {" "}
                ---No data---
              </div>
            )}
          </>
        )}
        {activeSection === 2 && (
          <>
            {approvedInnovation.length > 0 ? (
              <>
                {approvedInnovation.map((innovation) => (
                  <InnovationProfileCard
                    innovation={innovation}
                    key={innovation.id}
                  />
                ))}
              </>
            ) : (
              <div className="w-full flex justify-center items-center min-h-[150px]">
                {" "}
                ---No data---
              </div>
            )}
          </>
        )}
        {activeSection === 3 && (
          <>
            {pendingInnovation.length > 0 ? (
              <>
                {pendingInnovation.map((innovation) => (
                  <InnovationProfileCard
                    innovation={innovation}
                    key={innovation.id}
                  />
                ))}
              </>
            ) : (
              <div className="w-full flex justify-center items-center min-h-[150px]">
                {" "}
                ---No data---
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
