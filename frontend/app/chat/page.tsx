export default function ChatDashboard() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 text-center">
      <div className="max-w-md space-y-4">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Welcome to English Partner</h1>
        <p className="text-zinc-400">
          Select a conversation from the sidebar or start a new one to begin practicing your English with AI characters.
        </p>
        <div className="pt-4">
          <div className="inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-4 py-2 text-sm font-medium text-sky-400 ring-1 ring-inset ring-sky-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            Ready to teach
          </div>
        </div>
      </div>
    </div>
  );
}
