"use client";
import React from "react";
import { LoginForm } from "@/components/auth/login-form";
import { Suspense } from "react";
import { LoadingPage } from "@/components/loading-page";

const SignInPage = () => {
  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="w-screen h-screen bg-black/50 absolute top-0 flex justify-center items-center transition-all duration-300 ease-in-out">
        <LoginForm />
      </div>
    </Suspense>
  );
};

export default SignInPage;
