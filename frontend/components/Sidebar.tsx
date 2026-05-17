"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { fetchConversations, createConversation } from "@/lib/api";
import { IConversation } from "@/lib/types";
import { useUser } from "@/lib/user-context";

export default function Sidebar() {
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const { userId, userName, logout } = useUser();
  const router = useRouter();
  const params = useParams();
  const activeId = params.conversationId as string;

  const loadConversations = useCallback(async () => {
    if (!userId) return;
    try {
      const data = await fetchConversations(userId);
      setConversations(data);
    } catch (error) {
      console.error("Failed to load conversations:", error);
    }
  }, [userId]);

  useEffect(() => {
    setTimeout(() => {
      loadConversations();
    }, 0);
  }, [loadConversations]);

  const handleNewChat = async () => {
    try {
      const { conversationId } = await createConversation(userId!);
      await loadConversations();
      router.push(`/chat/${conversationId}`);
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="flex h-full w-80 flex-col bg-zinc-900 ring-1 ring-zinc-800">
      <div className="flex flex-col gap-y-4 p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-sky-400">Conversations</h2>
          <button
            onClick={handleNewChat}
            className="rounded-lg bg-zinc-800 p-2 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors"
            title="New Chat"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-2">
          {conversations.map((conv) => (
            <button
              key={conv.id}
              onClick={() => router.push(`/chat/${conv.id}`)}
              className={`w-full rounded-lg px-4 py-3 text-left text-sm transition-colors ${
                activeId === conv.id
                  ? "bg-sky-500/10 text-sky-400 ring-1 ring-inset ring-sky-500/20"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
              }`}
            >
              <div className="font-medium truncate">{conv.title}</div>
              <div className="mt-1 text-xs opacity-60">
                {new Date(conv.createdAt).toLocaleDateString()}
              </div>
            </button>
          ))}
          {conversations.length === 0 && (
            <div className="py-8 text-center text-sm text-zinc-500">
              No conversations yet
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto border-t border-zinc-800 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-sky-500 flex items-center justify-center text-xs font-bold text-white">
              {userName?.charAt(0).toUpperCase()}
            </div>
            <div className="text-sm font-medium text-zinc-300 truncate max-w-[120px]">
              {userName}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-zinc-500 hover:text-rose-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
