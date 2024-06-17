"use client";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const formSchema = z.object({
  innovation_id: z.string(),
  message: z.string().min(1, "Message is required"),
});

export const ForumChats = ({ innovationId }: { innovationId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);
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
    setLoading(true);
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
    setLoading(false);
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
    try {
      const { data } = await axios.get(
        `/api/v1/innovation/${innovationId}/discussion`
      );

      setComments(data.comments);

      console.log({ inn: data });
    } catch (error) {
      toast.error("Network error");
    }
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="w-full">
      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Include a hidden input for innovation_id */}
          <input type="hidden" {...form.register("innovation_id")} />
        </div>
        <Button
          size="lg"
          variant="outline"
          className="text-[16px] leading-[22px] rounded-xl font-semibold"
          onClick={form.handleSubmit(saveComment)}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </Button>
      </Form>

      <div>
        {comments.map((comment, i) => (
          <div key={i}>
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
