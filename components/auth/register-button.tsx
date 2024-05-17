"use client";
import { useRouter } from "next/navigation";


interface LoginButtonProps {
    children: React.ReactNode;
    mode?: "modal" | "redirect";
    asChild?: boolean,
}

export const RegisterButton =({
    children,
    mode="redirect",
    asChild
}: LoginButtonProps) => {

    const router = useRouter()

    const handleClick = () => {
        router.push("/auth/register")
    }

    if (mode == "modal") {
        return (
            <span>
                Modal here
            </span>
        )
    }
    return (
        <span className="cursor-pointer" onClick={handleClick}>
            {children}
        </span>
    )
}