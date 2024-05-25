"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaUser } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { LoginButton } from "@/components/auth/login-button";
import { RegisterButton } from "@/components/auth/register-button";
import { useSession } from "next-auth/react";
import { UserDropdownMenu } from "../auth/user-menu-button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const navLinks = [
    {
        href: "/",
        name: "Home"
    }, 
    {
        href: "/discussion",
        name: "Discussion forum"
    },
    {
        href: "/analytics",
        name: "Analytics"
    }
]

export const Navbar = () => {
    const pathname = usePathname();
    const router = useRouter()
    const { data: session } = useSession();

    useEffect(() => {}, [session])
    
    return (
        <div className="border-b shadow-sm border-b-white sticky top-0 bg-white z-40 px-5">
            <nav className="w-full h-[70px] grid grid-cols-3 items-center max-w-[1200px] mx-auto">
                <div>
                    <div className="px-3 py-2 text-[28px] font-black-ops w-fit rounded-lg tracking-wider text-mygreen">
                        STAVMiA
                    </div>
                </div>

                <div>
                    <div className='flex gap-6 text-[16px] justify-center'>
                        {navLinks.map(link => {
                            const isActive = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                            return (
                                <Link 
                                    href={link.href} 
                                    className={isActive ? "text-mygreen font-open-sans font-semibold" : "text-mygray hover:text-mygreen font-open-sans font-semibold"} 
                                    key={link.name}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className="flex justify-end items-center">
                    <div className="flex gap-x-3">
                        {session ? (
                            <div className="flex items-center gap-x-3">
                                    <Button className="dark:text-white" onClick={() => router.push("/upload")}>Upload Innovation</Button>
                                <UserDropdownMenu />
                            </div>
                        ) : (
                            <>
                                <LoginButton>
                                    <Button variant="outline" className="dark:text-white">Sign in</Button>
                                </LoginButton>
                                <RegisterButton>
                                    <Button className="flex gap-x-2 bg-mygreen" >
                                        Create an account <FaUser />
                                    </Button>
                                </RegisterButton>
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
