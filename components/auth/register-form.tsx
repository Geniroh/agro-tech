"use client";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { RegisterSchema } from "@/schemas";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormMessage,
  FormItem,
  FormField,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { register } from "@/actions/register";
import { IoMdPerson, IoMdMail } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";
import { FaSquareFacebook } from "react-icons/fa6";
import { signIn } from "next-auth/react";

import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const handleSocialLogin = (provider: SocialProvidersType) => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <div className="h-full ">
      <CardWrapper
        headerLabel=""
        backButtonHref="/auth/login"
        backButtonLabel="Already have an account?"
        backButtonVariant="link"
        actionTitle="Sign Up"
        showSocial={false}
      >
        <Form {...form}>
          <div className="flex gap-x-2 justify-between">
            <Button
              size="lg"
              className="w-full"
              variant="outline"
              onClick={() => handleSocialLogin("google")}
            >
              <div className="flex gap-x-2">
                <FcGoogle className="h-5 w-5" />
              </div>
            </Button>

            <Button
              size="lg"
              className="w-full"
              variant="outline"
              onClick={() => handleSocialLogin("facebook")}
            >
              <div className="flex gap-x-2">
                <FaSquareFacebook className="h-5 w-5 text-[#1877f2]" />
              </div>
            </Button>
          </div>
          <div className="w-full my-5 font-semibold text-center">Or</div>

          <p className="text-muted-foreground mt-2 text-center text-[16px] mb-3 ">
            Sign up with an email
          </p>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm text-center font-sans">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Please enter your name"
                        type="text"
                        className="rounded-md"
                        suffixicon={<IoMdPerson size={18} />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm text-center font-sans">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="Please enter your email address"
                        type="text"
                        className="rounded-md"
                        suffixicon={<IoMdMail size={18} />}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder="*****"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormError message={error} />
            <FormSuccess message={success} />

            <Button type="submit" className="w-full" disabled={isPending}>
              Register
            </Button>
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};
