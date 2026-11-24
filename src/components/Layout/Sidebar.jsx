import {
  LayoutDashboard, Building2, AlertTriangle, ShieldAlert,
  ListChecks, ShieldCheck, RotateCcw
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const NAV = [
  { key: 'dashboard',    label: 'Executive Overview',     icon: LayoutDashboard },
  { key: 'institutions', label: 'Affected Institutions',   icon: Building2 },
  { key: 'incidents',    label: 'Incident Reports',        icon: AlertTriangle },
  { key: 'risks',        label: 'Risk Assessment',         icon: ShieldAlert },
  { key: 'mitigation',   label: 'Mitigation Tasks',        icon: ListChecks },
  { key: 'preventive',   label: 'Preventive Controls',     icon: ShieldCheck },
];

export default function Sidebar({ active, onNavigate }) {
  const { resetData } = useAppContext();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-slate-900 border-r border-slate-700/50 flex flex-col z-30">
      {/* Logo / Title */}
      <div className="px-5 py-5 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-slate-100 leading-tight">BCIC Dashboard</h1>
            <p className="text-[10px] text-slate-500 uppercase tracking-wider">Cyber Incident Coord.</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {NAV.map(({ key, label, icon: Icon }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onNavigate(key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-blue-500/15 text-blue-400 border border-blue-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          );
        })}
      </nav>

      {/* Reset button */}
      <div className="px-3 pb-4">
        <button
          onClick={() => { if (confirm('Reset all data to defaults?')) resetData(); }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-xs text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-all border border-transparent hover:border-slate-700/50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Sample Data
        </button>
      </div>
    </aside>
  );
}
