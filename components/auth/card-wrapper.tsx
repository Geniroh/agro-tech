"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";
import Link from "next/link";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  actionTitle: string;
  backButtonVariant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  backButtonVariant,
  showSocial,
  actionTitle,
}: CardWrapperProps) => {
  return (
    <Card className="w-[300px] md:w-[400px] shadow-m overflow-y-auto no-scrollbar max-h-[500px] h-full">
      <CardHeader>
        <Link href="/">
          <div className="px-3 py-2 text-[28px] font-black-ops w-full rounded-lg tracking-wider text-mygreen text-center">
            STAVMiA
          </div>
        </Link>
        <Header label={headerLabel} title={actionTitle} />
      </CardHeader>

      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}

      <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
          variant={backButtonVariant}
        />
      </CardFooter>
    </Card>
  );
};
