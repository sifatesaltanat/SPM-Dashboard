import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ShieldCheck, Plus, X, CheckCircle2, Clock, AlertCircle, FileText } from 'lucide-react';

const IMPL_STATUSES = ['Planned', 'In Progress', 'Implemented', 'Verified'];
const CATEGORIES = ['Change Management', 'Automation', 'Testing', 'Monitoring', 'Governance', 'Training', 'Architecture'];

function StatusIcon({ status }) {
  if (status === 'Implemented' || status === 'Verified') return <CheckCircle2 className="w-4 h-4 text-emerald-400" />;
  if (status === 'In Progress') return <Clock className="w-4 h-4 text-amber-400" />;
  return <AlertCircle className="w-4 h-4 text-slate-400" />;
}

function StatusPill({ status }) {
  const cls = {
    Planned: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    'In Progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    Implemented: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    Verified: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  }[status] || 'bg-slate-500/20 text-slate-400 border-slate-500/30';
  return <span className={`${cls} text-xs font-semibold px-2.5 py-0.5 rounded-full border`}>{status}</span>;
}

export default function PreventivePage() {
  const { controls, addControl, updateControl } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', owner: '', implementationStatus: 'Planned', category: 'Change Management' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addControl(form);
    setForm({ title: '', description: '', owner: '', implementationStatus: 'Planned', category: 'Change Management' });
    setShowForm(false);
  };

  // Group by status
  const grouped = {};
  IMPL_STATUSES.forEach(s => { grouped[s] = controls.filter(c => c.implementationStatus === s); });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" /> Preventive Controls Register
        </h2>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-sm font-medium hover:bg-emerald-500/30 transition-colors">
          <Plus className="w-4 h-4" /> Add Control
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 w-full max-w-lg mx-4 space-y-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100">Add Preventive Control</h3>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Control Title *</label>
                <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50" placeholder="Control name…" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Description *</label>
                <textarea required rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 resize-none" placeholder="Describe the preventive control…" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Implementation Status</label>
                  <select value={form.implementationStatus} onChange={e => setForm(f => ({ ...f, implementationStatus: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50">
                    {IMPL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Owner *</label>
                <input required value={form.owner} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50" placeholder="Responsible person or team…" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-emerald-500 text-white text-sm font-medium hover:bg-emerald-600 transition-colors">Add Control</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Controls list */}
      <div className="space-y-6">
        {IMPL_STATUSES.map(status => {
          const items = grouped[status];
          if (!items || items.length === 0) return null;
          return (
            <div key={status}>
              <div className="flex items-center gap-2 mb-3">
                <StatusIcon status={status} />
                <h3 className="text-sm font-semibold text-slate-300">{status}</h3>
                <span className="text-xs text-slate-500">({items.length})</span>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                {items.map(ctrl => (
                  <div key={ctrl.id} className="card-hover space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-emerald-500/10 shrink-0">
                          <FileText className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-200">{ctrl.title}</p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded bg-slate-800 text-[11px] text-slate-400 border border-slate-700/50">{ctrl.category}</span>
                        </div>
                      </div>
                      <StatusPill status={ctrl.implementationStatus} />
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{ctrl.description}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500">Owner: <span className="text-slate-400">{ctrl.owner}</span></p>
                      <select
                        value={ctrl.implementationStatus}
                        onChange={e => updateControl(ctrl.id, { implementationStatus: e.target.value })}
                        className="rounded bg-slate-800 border border-slate-700 px-2 py-1 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50"
                      >
                        {IMPL_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
