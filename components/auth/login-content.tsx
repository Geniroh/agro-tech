// LoginContent.tsx
"use client";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { Social } from "@/components/auth/social";
import { FormError } from "@/components/form-error";
import { useSearchParams } from "next/navigation";

const LoginContent = () => {
  const searchParams = useSearchParams();

  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
    ? "Email already linked to an account, with a different provider"
    : "";

  return (
    <div className="w-screen h-screen bg-black/50 absolute top-0 flex justify-center items-center transition-all duration-300 ease-in-out">
      <CardWrapper
        headerLabel="Sign in to keep exploring, upload innovations and participate in forum discussions!"
        backButtonHref="/auth/register"
        backButtonLabel="Create an account"
        actionTitle="Sign In"
        backButtonVariant="default"
      >
        <Social />
        <div className="mt-3">
          <FormError message={urlError} />
        </div>
      </CardWrapper>
    </div>
  );
};

export default LoginContent;
