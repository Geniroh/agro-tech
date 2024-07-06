import { Suspense } from "react";
import LoginContent from "@/components/auth/login-content";
import { WhiteLoaderWithoutText } from "@/components/loaders/white-loader";

const LoginPage = () => {
  return (
    <Suspense fallback={<WhiteLoaderWithoutText />}>
      <LoginContent />
    </Suspense>
  );
};

export default LoginPage;
