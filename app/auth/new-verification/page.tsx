import NewVerificationForm from "@/components/auth/new-verification-form";
import { ClimbingLoaderP } from "@/components/general/climbing-loader";
import { Suspense } from "react";

export default function NewVerificationPage() {
    return (
        <Suspense fallback={<ClimbingLoaderP />}>
            <div className="w-screen h-screen bg-black/50 flex justify-center items-center">
                <NewVerificationForm />
            </div>
        </Suspense>
    )
}