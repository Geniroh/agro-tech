import { Navbar } from "@/components/general/navbar";

export default function DiscussionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`font-open-sans bg-white w-screen overflow-x-hidden`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
