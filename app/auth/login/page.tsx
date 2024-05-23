// "use client"
// import { CardWrapper } from "@/components/auth/card-wrapper"
// import { LoginForm } from "@/components/auth/login-form"
// import { Social } from "@/components/auth/social"
// import { FormError } from "@/components/form-error"
// import { useSearchParams } from "next/navigation"
// import { Suspense } from "react"

// const LoginPage = () => {
//     const searchParams = useSearchParams();

//     const urlError = searchParams.get("error") === "OAuthAccountNotLinked" ? "Email already linked to an account, with a different provider" : ""
//     return (
//         <Suspense fallback={<div>Loading...</div>}>
//             <div className="w-screen h-screen bg-black/50 absolute top-0 flex justify-center items-center transition-all duration-300 ease-in-out">
//                 <CardWrapper
//                     headerLabel="Sign in to keep exploring, upload innovations and participate in forum discussions!"
//                     backButtonHref="/auth/register"
//                     backButtonLabel="Create an account"
//                     actionTitle="Sign In"
//                     backButtonVariant="default"
//                 >
//                     <Social />
//                     <div className="mt-3">
//                         <FormError message={urlError} />
//                     </div>
//                 </CardWrapper>
//             </div>
//         </Suspense>
//     )
// }

// export default LoginPage

// /auth/login/page.tsx
import { Suspense } from "react";
import LoginContent from "@/components/auth/login-content";

const LoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginContent />
    </Suspense>
  );
};

export default LoginPage;
