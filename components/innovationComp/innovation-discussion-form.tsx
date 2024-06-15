"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Skeleton } from "@/components/ui/skeleton";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormMessage,
  FormItem,
  FormField,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";
import { IoSendSharp } from "react-icons/io5";
import { ClipLoader } from "react-spinners";

const formSchema = z.object({
  innovation_id: z.string(),
  message: z.string().min(1, "Message is required"),
});

export const InnovationDiscussionForum = ({
  innovationId,
}: {
  innovationId: string;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [btnLoading, setBtnLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<IInnovationComment[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      innovation_id: innovationId,
      message: "",
    },
  });

  const saveComment = (values: z.infer<typeof formSchema>) => {
    handleSubmit(values);
  };

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(
        "/api/v1/innovation/discussion",
        values
      );
      console.log(data);
      toast.success("Comment submitted successfully");
    } catch (error) {
      toast.error("Network error");
      console.log(error);
    }
    setBtnLoading(false);
  };

  const handleReaction = async (reaction: "like" | "dislike", id: string) => {
    const payload = {
      commentId: id,
      reaction,
    };
    try {
      const { data } = await axios.post(
        `/api/v1/innovation/${innovationId}/discussion/reaction`,
        payload
      );
      console.log(data);
    } catch (error) {
      toast.error("Network error");
      console.log(error);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/api/v1/innovation/${innovationId}/discussion`
      );

      setComments(data.comments);

      console.log({ inn: data });
    } catch (error) {
      toast.error("Network error");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col space-y-3 w-full container">
        <Skeleton className="h-[300px] w-full mt-10" />
      </div>
    );
  }

  return (
    <div className="container w-full">
      <h2 className="text-lg text-muted-foreground mt-10">
        Join the community
      </h2>
      <div className="my-10">
        <Form {...form}>
          <div className="space-y-6">
            <input type="hidden" {...form.register("innovation_id")} />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="bg-myoffwhie py-1 px-6 rounded-3xl w-full flex items-center">
                      <input
                        {...field}
                        className="bg-transparent border-0 outline-none w-full text-[14px]"
                        placeholder="Share your thoughts"
                      />
                      <div className="flex text-[14px] gap-x-2">
                        {btnLoading ? (
                          <ClipLoader size={13} />
                        ) : (
                          <button
                            className="p-2 flex items-center justify-center rounded-full hover:bg-white border"
                            onClick={form.handleSubmit(saveComment)}
                          >
                            <IoSendSharp />
                          </button>
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </Form>
      </div>

      <div>
        {comments.map((comment, i) => (
          <div>
            <ul key={i} className="flex gap-6">
              <li>{comment?.message}</li>
              <li>Dislikes: {comment.dislikes}</li>
              <li>Likes: {comment.likes}</li>
              <Button onClick={() => handleReaction("like", comment.id)}>
                Like
              </Button>
              <Button onClick={() => handleReaction("dislike", comment.id)}>
                Dislike
              </Button>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
