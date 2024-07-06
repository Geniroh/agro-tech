import NewVerificationForm from "@/components/auth/new-verification-form";
import { WhiteLoaderWithoutText } from "@/components/loaders/white-loader";
import { Suspense } from "react";

export default function NewVerificationPage() {
  return (
    <Suspense fallback={<WhiteLoaderWithoutText />}>
      <div className="w-screen h-screen bg-black/50 flex justify-center items-center">
        <NewVerificationForm />
      </div>
    </Suspense>
  );
}
