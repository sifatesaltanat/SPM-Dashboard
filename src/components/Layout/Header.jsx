import { Shield, Bell, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-64 right-0 h-14 bg-slate-900/95 backdrop-blur border-b border-slate-700/50 flex items-center justify-between px-6 z-20">
      {/* Incident banner */}
      <div className="flex items-center gap-3 min-w-0">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
        </span>
        <p className="text-xs md:text-sm font-medium text-red-400 truncate">
          <span className="font-bold">ACTIVE SIMULATION:</span>{' '}
          Windows Patch Core Banking Vulnerability | 35% Institutions Impacted
        </p>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 shrink-0 ml-4">
        {/* Notification bell */}
        <button className="relative p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Role badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
          <Shield className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-xs font-medium text-blue-400">Authorised Taskforce Member</span>
        </div>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center">
          <User className="w-4 h-4 text-slate-300" />
        </div>
      </div>
    </header>
  );
}
