import { NewPasswordForm } from "@/components/auth/new-password-form";
import { LoadingPage } from "@/components/loading-page";
import React, { Suspense } from "react";

const NewPasswordPage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="w-screen h-screen bg-black/50 flex justify-center items-center">
        <NewPasswordForm />
      </div>
    </Suspense>
  );
};

export default NewPasswordPage;
