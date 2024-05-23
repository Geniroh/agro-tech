import NewVerificationForm from "@/components/auth/new-verification-form";
import { Suspense } from "react";

export default function NewVerificationPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="w-screen h-screen bg-black/50 flex justify-center items-center">
                <NewVerificationForm />
            </div>
        </Suspense>
    )
}