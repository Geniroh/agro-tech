import { ErrorCard } from "@/components/auth/error-card";

export default function AuthErrorPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black/80">
      <ErrorCard />
    </div>
  );
}
