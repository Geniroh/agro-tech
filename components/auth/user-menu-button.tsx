import {
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSession, signOut } from "next-auth/react";
import { getFirstName } from "@/utils/function";
import { LoginButton } from "@/components/auth/login-button";
import { LogoutButton } from "./logout-button";
import Link from "next/link";

export const UserDropdownMenu = () => {
  const { data: session } = useSession();
  const firstname = getFirstName(session?.user?.name);

  return (
    <>
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              {firstname}
              <User className="mr-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/profile" className="w-full">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
              <LogoutButton className="w-full">
            <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
            </DropdownMenuItem>
              </LogoutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <LoginButton>
          <Button variant="outline" className="dark:text-white">
            Sign in
          </Button>
        </LoginButton>
      )}
    </>
  );
};

