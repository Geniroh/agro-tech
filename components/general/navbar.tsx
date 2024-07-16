"use client";
import React, { forwardRef, useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaUser } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { LoginButton } from "@/components/auth/login-button";
import { RegisterButton } from "@/components/auth/register-button";
import { useSession } from "next-auth/react";
import { UserDropdownMenu } from "@/components/auth/user-menu-button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", name: "Home" },
  { href: "/discussion", name: "Discussion forum" },
  { href: "/analytics", name: "Analytics" },
];

interface NavbarProps {
  ref2?: any;
}

const Navbar = forwardRef<HTMLDivElement, NavbarProps>((props, ref) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {}, [session, status]);

  return (
    <div className="border-b shadow-sm border-b-white relative md:sticky top-0 bg-white z-40 px-5">
      <nav className="w-full h-[70px] grid grid-cols-3 items-center max-w-[1200px] mx-auto">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="lg:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu />
          </Button>
          <div>
            <Link href="/">
              <div className="px-3 py-2 text-[28px] font-black-ops w-fit rounded-lg tracking-wider text-mygreen">
                STAVMiA
              </div>
            </Link>
          </div>
        </div>

        <div>
          <div
            className="hidden lg:flex gap-6 text-[16px] justify-center"
            ref={props.ref2}
          >
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  href={link.href}
                  className={
                    isActive
                      ? "text-mygreen font-open-sans font-semibold"
                      : "text-mygray hover:text-mygreen font-open-sans font-semibold"
                  }
                  key={link.name}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="flex justify-end items-center" ref={ref}>
          <div className="flex gap-x-3">
            {session ? (
              <div className="flex items-center gap-x-3">
                <Button
                  className="dark:text-white hidden md:flex"
                  onClick={() => router.push("/upload")}
                >
                  Upload Innovation
                </Button>
                <UserDropdownMenu />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <LoginButton>
                  <Button
                    variant="outline"
                    className="hidden md:flex"
                    disabled={status === "loading"}
                  >
                    Sign In
                  </Button>
                  <Button
                    className="bg-mygreen md:hidden"
                    disabled={status === "loading"}
                  >
                    Sign In
                  </Button>
                </LoginButton>
                <RegisterButton>
                  <Button className="hidden md:flex gap-x-2 bg-mygreen">
                    Create an account <FaUser />
                  </Button>
                </RegisterButton>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        style={{ zIndex: 10 }}
        className={`fixed lg:hidden top-0 left-0 z-20 w-64 h-full transition-all duration-500 transform bg-white shadow-lg ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <X
            className="text-[24px] font-light leading-[32px] cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>
        <div className="px-6 py-4 flex flex-col">
          <div className="px-3 py-2 text-[28px] font-black-ops w-full text-center rounded-lg tracking-wider text-mygreen">
            STAVMiA
          </div>
          <div>
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className={`${
                  pathname === link.href
                    ? "text-mygreen font-open-sans font-semibold"
                    : "text-mygray hover:text-mygreen font-open-sans font-semibold"
                } min-h-[15px] flex items-center py-3 justify-center w-full border-b border-b-mygreen`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              key={12133}
              href={"/innovations"}
              className={`${
                pathname === "/innovations"
                  ? "text-mygreen font-open-sans font-semibold"
                  : "text-mygray hover:text-mygreen font-open-sans font-semibold"
              } min-h-[15px] flex items-center py-3 justify-center w-full border-b border-b-mygreen`}
            >
              View Innovation
            </Link>
            <Link
              key={12}
              href={"/upload"}
              className={`${
                pathname === "/upload"
                  ? "text-mygreen font-open-sans font-semibold"
                  : "text-mygray hover:text-mygreen font-open-sans font-semibold"
              } min-h-[15px] flex items-center py-3 justify-center w-full border-b border-b-mygreen`}
            >
              Upload Innovation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
});

Navbar.displayName = "Navbar";

export { Navbar };
