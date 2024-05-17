"use client";
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link";


interface BackButtonProps {
    href: string;
    label: string;
    variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
}

export const BackButton = ({
    href, label, variant
}: BackButtonProps) => {


    return (

        <Button
            variant={variant}
            className="font-normal w-full"
            size="lg"
            asChild
        >
            <Link href={href}>{label}</Link>
        </Button>
    )
}