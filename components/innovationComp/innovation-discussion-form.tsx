// import { useAppContext } from "@/context/AppContext";
// import { Form, Input, message } from "antd";
// import axios from "axios";
// import { useState } from "react";
// import { IoMdSend } from "react-icons/io";
// import { ReactionButtons } from "../general/reaction-buttons";
// import { getFirstName } from "@/utils/function";

// export const InnovationDiscussionForum = ({
//   innovationId,
//   comments,
// }: {
//   innovationId: string;
//   comments: IInnovationComment[];
// }) => {
//   const [form] = Form.useForm();
//   const [myComments, setMyComments] = useState<IInnovationComment[]>(comments);
//   const { setCommented } = useAppContext();

//   const handleDisucssions = async () => {
//     try {
//       const values = await form.validateFields();
//       const { data } = await axios.post<{
//         comment: IInnovationComment;
//         comments: IInnovationComment[];
//         message: string;
//       }>(`/api/v1/innovation/${innovationId}/discussion`, {
//         innovation_id: innovationId,
//         message: values.message,
//       });
//       setCommented(values.message);
//       form.resetFields();
//       setMyComments(comments);
//       message.info("Commented");
//     } catch (error) {
//       message.error("Network error");
//     }
//   };

//   return (
//     <div className="mt-5">
//       <Form form={form}>
//         <Form.Item name="message">
//           <Input
//             placeholder="Share your thoughts"
//             className="w-full"
//             variant="filled"
//             size="large"
//             onPressEnter={handleDisucssions}
//             suffix={
//               <IoMdSend
//                 className="text-mygreen cursor-pointer"
//                 onClick={handleDisucssions}
//               />
//             }
//           />
//         </Form.Item>
//       </Form>

//       {/* COMMENTS */}
//       <>
//         <div className="md:ml-10 space-y-10">
//           {myComments?.map((comment, i) => (
//             <div
//               className="min-h-[56px] flex items-end justify-between"
//               key={i}
//             >
//               <div className="flex items-center gap-3 ">
//                 <div className="w-[40px] h-[40px] rounded-full bg-mygreen flex justify-center items-center text-white">
//                   {getFirstName(comment.username)[0]}
//                 </div>

//                 <div className="flex flex-col justify-between text-[16px] leading-[24px]">
//                   <span className="font-semibold">{comment.username}</span>
//                   <span>{comment.message}</span>
//                 </div>
//               </div>

//               <ReactionButtons
//                 dislikes={0}
//                 likes={0}
//                 replies={0}
//                 type="discussion"
//                 id={innovationId}
//                 isCommentId={comment.id}
//               />
//             </div>
//           ))}
//         </div>
//       </>
//     </div>
//   );
// };

import { useAppContext } from "@/context/AppContext";
import { Form, Input, message, Button } from "antd";
import axios from "axios";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { ReactionButtons } from "../general/reaction-buttons";
import { getFirstName } from "@/utils/function";

export const InnovationDiscussionForum = ({
  innovationId,
  comments,
}: {
  innovationId: string;
  comments: IInnovationComment[];
}) => {
  const [form] = Form.useForm();
  const [myComments, setMyComments] = useState<IInnovationComment[]>(comments);
  const [displayedComments, setDisplayedComments] = useState<number>(10); // Initial number of comments to display
  const { setCommented } = useAppContext();

  const handleDisucssions = async () => {
    try {
      const values = await form.validateFields();
      const { data } = await axios.post<{
        comment: IInnovationComment;
        comments: IInnovationComment[];
        message: string;
      }>(`/api/v1/innovation/${innovationId}/discussion`, {
        innovation_id: innovationId,
        message: values.message,
      });
      setCommented(values.message);
      form.resetFields();
      setMyComments(data.comments); // Update the comments with the new list from the response
      message.info("Commented");
    } catch (error) {
      message.error("Network error");
    }
  };

  const showMoreComments = () => {
    setDisplayedComments((prev) => prev + 10); // Increase the number of displayed comments by 10
  };

  return (
    <div className="mt-5">
      <Form form={form}>
        <Form.Item name="message">
          <Input
            placeholder="Share your thoughts"
            className="w-full"
            variant="filled"
            size="large"
            onPressEnter={handleDisucssions}
            suffix={
              <IoMdSend
                className="text-mygreen cursor-pointer"
                onClick={handleDisucssions}
              />
            }
          />
        </Form.Item>
      </Form>

      {/* COMMENTS */}
      <>
        <div className="md:ml-10 space-y-10">
          {myComments.slice(0, displayedComments).map((comment, i) => (
            <div
              className="min-h-[56px] flex items-end justify-between"
              key={i}
            >
              <div className="flex items-center gap-3">
                <div className="w-[40px] h-[40px] rounded-full bg-mygreen flex justify-center items-center text-white">
                  {getFirstName(comment.username)[0]}
                </div>

                <div className="flex flex-col justify-between text-[16px] leading-[24px]">
                  <span className="font-semibold">{comment.username}</span>
                  <span>{comment.message}</span>
                </div>
              </div>

              <ReactionButtons
                dislikes={comment.dislikes || 0}
                likes={comment.likes || 0}
                replies={0}
                type="discussion"
                id={innovationId}
                isCommentId={comment.id}
              />
            </div>
          ))}
        </div>

        {myComments.length > displayedComments && (
          <div className="text-center mt-4">
            <Button onClick={showMoreComments} type="default">
              Show More
            </Button>
          </div>
        )}
      </>
    </div>
  );
};
