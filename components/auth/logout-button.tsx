// "use client";
// import { logout } from "@/actions/logout";
// import { useState } from "react";
// import { ClipLoader } from "react-spinners";

// export const LogoutButton = ({
//   children,
//   className,
// }: {
//   children: React.ReactNode;
//   className?: string;
// }) => {
//   const [loading, setLoading] = useState(false);

//   const onClick = async () => {
//     setLoading(true);
//     await logout();
//     setLoading(false);
//   };

//   return (
//     <button onClick={onClick} className={className} disabled={loading}>
//       {loading ? <ClipLoader size={14} /> : children}
//     </button>
//   );
// };

// import { logout } from "@/actions/logout";

import { signOut } from "next-auth/react";

export const LogoutButton = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" }); // Redirect to the homepage or any other URL after logout
  };

  return (
    <button onClick={handleLogout} className={className}>
      {children}
    </button>
  );
};
