import { Form, Input, message } from "antd";
import axios from "axios";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";

// const formSchema = z.object({
//   innovation_id: z.string(),
//   message: z.string().min(1, "Message is required"),
// });

// export const InnovationDiscussionForum = ({
//   innovationId,
//   comments,
// }: {
//   innovationId: string;
//   comments: IInnovationComment[];
// }) => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [btnLoading, setBtnLoading] = useState<boolean>(false);
//   const [comment, setComment] = useState<IInnovationComment[]>(comments);
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       innovation_id: innovationId,
//       message: "",
//     },
//   });

//   const saveComment = (values: z.infer<typeof formSchema>) => {
//     handleSubmit(values);
//   };

//   console.log(comments);

//   const handleSubmit = async (values: z.infer<typeof formSchema>) => {
//     setBtnLoading(true);
//     try {
//       const { data } = await axios.post(
//         "/api/v1/innovation/discussion",
//         values
//       );
//       console.log(data);
//       form.reset();
//       toast.success("Comment submitted successfully");
//     } catch (error) {
//       toast.error("Network error");
//       console.log(error);
//     }
//     setBtnLoading(false);
//   };

//   const handleReaction = async (reaction: "like" | "dislike", id: string) => {
//     const payload = {
//       commentId: id,
//       reaction,
//     };
//     try {
//       const { data } = await axios.post(
//         `/api/v1/innovation/${innovationId}/discussion/reaction`,
//         payload
//       );
//       console.log(data);
//       fetchData();
//     } catch (error) {
//       toast.error("Network error");
//       console.log(error);
//     }
//   };

//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const { data } = await axios.get(
//         `/api/v1/innovation/${innovationId}/discussion`
//       );
//       setComment(data.comments);
//       console.log({ inn: data });
//     } catch (error) {
//       toast.error("Network error");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {}, []);

//   if (loading) {
//     return (
//       <div className="flex flex-col space-y-3 w-full container">
//         <Skeleton className="h-[300px] w-full mt-10" />
//       </div>
//     );
//   }

//   return (
//     <div className="w-full">
//       <h2 className="text-lg text-muted-foreground mt-10">
//         Join the community
//       </h2>
//       <div className="my-10">
//         <Form {...form}>
//           <div className="space-y-6">
//             <input type="hidden" {...form.register("innovation_id")} />

//             <FormField
//               control={form.control}
//               name="message"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormControl>
//                     <div className="bg-myoffwhie py-2 px-6 rounded-3xl w-full flex items-center">
//                       <input
//                         {...field}
//                         className="bg-transparent border-0 outline-none w-full text-[14px]"
//                         placeholder="Share your thoughts"
//                         onKeyDown={(e) => {
//                           if (e.key === "Enter") {
//                             e.preventDefault();
//                             form.handleSubmit(saveComment)();
//                           }
//                         }}
//                       />
//                       <div className="flex text-[14px] gap-x-2">
//                         {btnLoading ? (
//                           <ClipLoader size={13} />
//                         ) : (
//                           <button
//                             className="p-2 flex items-center justify-center rounded-full hover:bg-white border"
//                             onClick={form.handleSubmit(saveComment)}
//                           >
//                             <IoSendSharp />
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>
//         </Form>
//       </div>

//       <div className="ml-[15px] md:ml-[30px] lg:ml-[60px] px-10">
//         <div className="space-y-6">
//           {comments.map((comment, i) => (
//             <InnovationCommentCard comments={comment} key={i} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

interface DiscussionForumProps {
  createdAt?: Date;
  dislikes: number;
  email: string;
  id: string;
  innovationDiscussionId: string;
  likes: number;
  message: string;
  replies?: any | any[];
  topReply?: string;
  updatedAt?: Date;
  username: string;
}

export const InnovationDiscussionForum = ({
  innovationId,
  comments,
}: {
  innovationId: string;
  comments: IInnovationComment[];
}) => {
  const [form] = Form.useForm();
  const [myComments, setMyComments] = useState<IInnovationComment[]>(comments);

  const handleDisucssions = async () => {
    try {
      const values = await form.validateFields();
      const { data } = await axios.post(
        `/api/v1/innovation/${innovationId}/discussion`,
        { innovation_id: innovationId, message: values.message }
      );
      console.log(data);
      form.resetFields();
    } catch (error) {}
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
    </div>
  );
};
