import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Search, Filter, X, Building2, Wifi, ArrowRightLeft, CreditCard, ExternalLink } from 'lucide-react';

function StatusBadge({ status }) {
  const cls = { Critical: 'badge-critical', Degraded: 'badge-degraded', Operational: 'badge-operational' }[status] || 'badge-medium';
  return <span className={`${cls} text-xs font-semibold px-2.5 py-0.5 rounded-full`}>{status}</span>;
}

function ServiceTag({ service }) {
  const icons = { 'Online Banking': Wifi, 'Interbank Transfers': ArrowRightLeft, 'Payment Gateway': CreditCard };
  const Icon = icons[service] || Wifi;
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-300 border border-slate-700/50">
      <Icon className="w-3 h-3" /> {service}
    </span>
  );
}

export default function InstitutionsPage() {
  const { institutions, incidents, tasks } = useAppContext();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selected, setSelected] = useState(null);

  const filtered = institutions.filter(i => {
    const matchSearch = i.name.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || i.impact === filterStatus;
    return matchSearch && matchStatus;
  });

  const instIncidents = selected ? incidents.filter(inc => inc.institution === selected.name) : [];
  const instTasks = selected ? tasks.filter(t => t.institution === selected.name) : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-blue-400" /> Affected Institutions Monitor
        </h2>

        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search institutions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 w-56 rounded-lg bg-slate-800 border border-slate-700 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20"
            />
          </div>

          {/* Filter */}
          <div className="flex items-center gap-1">
            <Filter className="w-4 h-4 text-slate-500" />
            {['All', 'Critical', 'Degraded', 'Operational'].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                  filterStatus === s ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Institution</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Impact Status</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Affected Services</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Patch Version</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Updated</th>
              <th className="py-3 px-4"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(inst => (
              <tr key={inst.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-4 font-medium text-slate-200">{inst.name}</td>
                <td className="py-3 px-4"><StatusBadge status={inst.impact} /></td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {inst.services.length > 0 ? inst.services.map(s => <ServiceTag key={s} service={s} />) : <span className="text-xs text-emerald-400">All Operational</span>}
                  </div>
                </td>
                <td className="py-3 px-4 text-xs text-slate-400 font-mono">{inst.patchVersion}</td>
                <td className="py-3 px-4 text-xs text-slate-400">{new Date(inst.lastUpdated).toLocaleString('en-MY')}</td>
                <td className="py-3 px-4">
                  <button onClick={() => setSelected(inst)} className="p-1.5 rounded-lg text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} className="py-8 text-center text-slate-500 text-sm">No institutions match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail drawer/modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative w-full max-w-lg bg-slate-900 border-l border-slate-700/50 h-full overflow-y-auto p-6 space-y-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100">{selected.name}</h3>
              <button onClick={() => setSelected(null)} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"><X className="w-5 h-5" /></button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="card"><p className="text-xs text-slate-400 mb-1">Impact Status</p><StatusBadge status={selected.impact} /></div>
              <div className="card"><p className="text-xs text-slate-400 mb-1">Patch Version</p><p className="text-sm font-mono text-slate-200">{selected.patchVersion}</p></div>
            </div>

            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Affected Services</p>
              <div className="flex flex-wrap gap-2">
                {selected.services.length > 0 ? selected.services.map(s => <ServiceTag key={s} service={s} />) : <span className="text-sm text-emerald-400">All Operational</span>}
              </div>
            </div>

            {instIncidents.length > 0 && (
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Related Incidents ({instIncidents.length})</p>
                <div className="space-y-2">
                  {instIncidents.map(inc => (
                    <div key={inc.id} className="card text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-200">{inc.service}</span>
                        <StatusBadge status={inc.severity} />
                      </div>
                      <p className="text-slate-400">{inc.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {instTasks.length > 0 && (
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Mitigation Tasks ({instTasks.length})</p>
                <div className="space-y-2">
                  {instTasks.map(t => (
                    <div key={t.id} className="card text-xs flex items-center justify-between">
                      <span className="text-slate-200">{t.title}</span>
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${t.status === 'Done' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'}`}>{t.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
