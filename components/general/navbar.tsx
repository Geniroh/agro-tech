"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FaUser } from "react-icons/fa";
import { usePathname } from 'next/navigation';
import { LoginButton } from "@/components/auth/login-button";
import { RegisterButton } from "@/components/auth/register-button";
import { useSession } from "next-auth/react";
import { UserDropdownMenu } from "../auth/user-menu-button";

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
    const { data: session } = useSession();
    
    return (
        <div className="border-b shadow-sm sticky top-0 bg-white">
            <nav className="w-full h-[70px] grid grid-cols-3 items-center mycontainer">
                <div>
                    <div className="px-3 py-2 bg-mypurple text-white font-playfair w-fit rounded-lg font-bold tracking-wider">
                        STAVMiA
                    </div>
                </div>

                <div>
                    <div className='flex gap-6 text-[16px] justify-center'>
                        {navLinks.map(link => {
                            const isActive = pathname.startsWith(link.href);
                            return (
                                <Link 
                                    href={link.href} 
                                    className={isActive ? "text-myblack font-semibold font-sans" : "text-mygray hover:text-myblack font-semibold font-sans"} 
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
                                <Button className="dark:text-white">Upload Innovation</Button>
                                <UserDropdownMenu />
                            </div>
                        ) : (
                            <>
                                <LoginButton>
                                    <Button variant="outline" className="dark:text-white">Sign in</Button>
                                </LoginButton>
                                <RegisterButton>
                                    <Button className="flex gap-x-2">
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
