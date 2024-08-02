"use client";
import { Header } from "@/components/auth/header";
import { BackButton } from "@/components/auth/back-button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { useSearchParams } from "next/navigation";
import { CardWrapper } from "./card-wrapper";
import Link from "next/link";

export const ErrorCard = () => {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <Card className="w-[300px] md:w-[400px] shadow-md">
      <CardHeader>
        <Link href="/">
          <div className="px-3 py-2 text-[28px] font-black-ops w-full rounded-lg tracking-wider text-mygreen text-center">
            STAVMiA
          </div>
        </Link>
        <Header
          title="Login failed"
          label={
            error === "Configuration"
              ? "Email already exists"
              : "Oops! Something went wrong"
          }
        />
      </CardHeader>
      <CardFooter>
        <BackButton label="Back to login" href="/auth/login" variant="link" />
      </CardFooter>
    </Card>
  );
};
