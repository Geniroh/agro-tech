import NewVerificationForm from "@/components/auth/new-verification-form";
import { LoadingPage } from "@/components/loading-page";
import { Suspense } from "react";

export default function NewVerificationPage() {
  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="w-screen h-screen bg-black/50 flex justify-center items-center">
        <NewVerificationForm />
      </div>
    </Suspense>
  );
}
