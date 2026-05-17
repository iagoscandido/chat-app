"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@/lib/user-context";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Basic check for auth, wait for client-side hydration
    const storedId = localStorage.getItem("english_partner_user_id");
    if (!storedId) {
      router.push("/login");
    }
  }, [router]);

  if (!userId) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950">
      <Sidebar />
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>
    </div>
  );
}
