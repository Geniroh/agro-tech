import { Merriweather} from "next/font/google";
import { cn } from "@/lib/utils";

const font = Merriweather({
    subsets: ["latin"],
    weight: ["300", "400", "700", "900"],
})

interface HeaderProps {
    label: string;
    title: string;
}

export const Header = ({ label, title }: HeaderProps) => {

    return (
        <div className={cn("w-full flex flex-col gap-y-4 items-center justify-center", font.className)}>
            <h1 className="font-playfair font-semibold text-2xl">
                {title}
            </h1>
            <p className="text-muted-foreground text-sm text-center font-sans">
                {label}
            </p>
        </div>
    )
}