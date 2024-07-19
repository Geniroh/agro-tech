import { signOut } from "next-auth/react";

export const LogoutButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <button onClick={handleLogout} className={className}>
      {children}
    </button>
  );
};
