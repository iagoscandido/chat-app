"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/user-context";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [id, setId] = useState("00000000-0000-0000-0000-000000000001");
  const { login } = useUser();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && id.trim()) {
      login(id, name);
      router.push("/chat");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4 font-sans text-zinc-50">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-zinc-900 p-8 shadow-2xl ring-1 ring-zinc-800">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-sky-400">English Partner</h1>
          <p className="mt-2 text-zinc-400">Enter your details to start chatting</p>
        </div>
        
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-zinc-300">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-lg border-0 bg-zinc-800 px-4 py-3 text-zinc-50 ring-1 ring-inset ring-zinc-700 placeholder:text-zinc-500 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="userId" className="block text-sm font-medium text-zinc-300">
                User ID (UUID)
              </label>
              <input
                id="userId"
                type="text"
                required
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="mt-1 block w-full rounded-lg border-0 bg-zinc-800 px-4 py-3 text-zinc-50 ring-1 ring-inset ring-zinc-700 placeholder:text-zinc-500 focus:ring-2 focus:ring-inset focus:ring-sky-500 sm:text-sm"
                placeholder="00000000-0000-0000-0000-000000000001"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-lg bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 transition-colors"
          >
            Enter Cursed Realm
          </button>
        </form>
      </div>
    </div>
  );
}
