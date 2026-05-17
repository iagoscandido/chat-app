"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/user-context";

export default function Home() {
  const { userId } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      router.push("/chat");
    } else {
      // Check localStorage directly for initial hydration
      const storedId = localStorage.getItem("english_partner_user_id");
      if (storedId) {
        router.push("/chat");
      } else {
        router.push("/login");
      }
    }
  }, [userId, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"></div>
    </div>
  );
}
