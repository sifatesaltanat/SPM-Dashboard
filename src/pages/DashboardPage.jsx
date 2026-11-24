import { useAppContext } from '../context/AppContext';
import {
  Building2, AlertTriangle, Wifi, ArrowRightLeft, CreditCard,
  TrendingUp, Activity, Clock, CheckCircle2
} from 'lucide-react';
import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts';

/* ---------- helpers ---------- */
function StatusBadge({ status }) {
  const cls = {
    Critical: 'badge-critical', High: 'badge-high',
    Medium: 'badge-medium', Low: 'badge-low',
    Resolved: 'badge-low', Operational: 'badge-operational',
    Degraded: 'badge-degraded',
  }[status] || 'badge-medium';
  return <span className={`${cls} text-xs font-semibold px-2.5 py-0.5 rounded-full`}>{status}</span>;
}

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit' });
}

const SEVERITY_COLORS = { Critical: '#ef4444', High: '#f97316', Medium: '#f59e0b', Low: '#10b981' };

/* ---------- component ---------- */
export default function DashboardPage() {
  const { institutions, incidents, tasks, risks, activityFeed } = useAppContext();

  // KPIs
  const affected = institutions.filter(i => i.impact !== 'Operational').length;
  const pctAffected = Math.round((affected / institutions.length) * 100);
  const criticalIncidents = incidents.filter(i => i.severity === 'Critical').length;
  const onlineBanking = institutions.filter(i => i.services.includes('Online Banking')).length;
  const interbank = institutions.filter(i => i.services.includes('Interbank Transfers')).length;
  const paymentGw = institutions.filter(i => i.services.includes('Payment Gateway')).length;
  const doneTasks = tasks.filter(t => t.status === 'Done').length;
  const mitigationPct = tasks.length ? Math.round((doneTasks / tasks.length) * 100) : 0;

  // Severity distribution for pie
  const sevCounts = {};
  incidents.forEach(i => { sevCounts[i.severity] = (sevCounts[i.severity] || 0) + 1; });
  const sevData = Object.entries(sevCounts).map(([name, value]) => ({ name, value }));

  // Response status bar chart
  const statusCounts = {};
  tasks.forEach(t => { statusCounts[t.status] = (statusCounts[t.status] || 0) + 1; });
  const statusData = ['To Do', 'In Progress', 'Under Review', 'Done'].map(s => ({
    name: s, count: statusCounts[s] || 0,
  }));
  const statusColors = { 'To Do': '#94a3b8', 'In Progress': '#3b82f6', 'Under Review': '#f59e0b', 'Done': '#10b981' };

  const kpis = [
    { label: 'Institutions Affected', value: `${affected} / ${institutions.length}`, sub: `${pctAffected}% impacted`, icon: Building2, color: 'text-red-400', bg: 'bg-red-500/10' },
    { label: 'Active Critical Incidents', value: criticalIncidents, sub: `of ${incidents.length} total`, icon: AlertTriangle, color: 'text-orange-400', bg: 'bg-orange-500/10' },
    { label: 'Online Banking Disrupted', value: onlineBanking, sub: 'institutions', icon: Wifi, color: 'text-blue-400', bg: 'bg-blue-500/10' },
    { label: 'Interbank Transfers Disrupted', value: interbank, sub: 'institutions', icon: ArrowRightLeft, color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { label: 'Payment Gateways Disrupted', value: paymentGw, sub: 'institutions', icon: CreditCard, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Mitigation Progress', value: `${mitigationPct}%`, sub: `${doneTasks} / ${tasks.length} tasks done`, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-100">Executive Overview</h2>

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div key={label} className="card-hover flex items-start gap-4">
            <div className={`${bg} p-3 rounded-xl shrink-0`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">{label}</p>
              <p className="text-2xl font-bold text-slate-100">{value}</p>
              <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Severity pie */}
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" /> Incident Severity Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sevData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={4} dataKey="value" label={({ name, value }) => `${name}: ${value}`}>
                  {sevData.map(d => (
                    <Cell key={d.name} fill={SEVERITY_COLORS[d.name] || '#64748b'} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#e2e8f0' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Response status bar */}
        <div className="card">
          <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Response Status Overview
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#334155' }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#334155' }} allowDecimals={false} />
                <Tooltip contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#e2e8f0' }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {statusData.map(d => (
                    <Cell key={d.name} fill={statusColors[d.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Activity feed */}
      <div className="card">
        <h3 className="text-sm font-semibold text-slate-300 mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-amber-400" /> Live Activity Feed
        </h3>
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {activityFeed.slice(0, 15).map(a => (
            <div key={a.id} className="flex items-start gap-3 py-2 border-b border-slate-800 last:border-0">
              <span className="text-[11px] text-slate-500 w-14 shrink-0 pt-0.5">{formatTime(a.timestamp)}</span>
              <div className="min-w-0">
                <span className="text-xs font-semibold text-blue-400">{a.action}</span>
                <p className="text-xs text-slate-300 truncate">{a.detail}</p>
                <p className="text-[11px] text-slate-500">by {a.user}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
