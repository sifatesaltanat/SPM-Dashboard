import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { TASKFORCE_MEMBERS } from '../data/sampleData';
import { AlertTriangle, Plus, X, FileText } from 'lucide-react';

function StatusBadge({ status }) {
  const cls = { Critical: 'badge-critical', High: 'badge-high', Medium: 'badge-medium', Low: 'badge-low' }[status] || 'badge-medium';
  return <span className={`${cls} text-xs font-semibold px-2.5 py-0.5 rounded-full`}>{status}</span>;
}

const SERVICES = ['Online Banking', 'Interbank Transfers', 'Payment Gateway'];
const SEVERITIES = ['Critical', 'High', 'Medium', 'Low'];

export default function IncidentsPage() {
  const { incidents, institutions, addIncident } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ institution: '', service: '', severity: 'High', description: '', reportedBy: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addIncident({ ...form, timestamp: new Date().toISOString() });
    setForm({ institution: '', service: '', severity: 'High', description: '', reportedBy: '' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-orange-400" /> Incident Reports
        </h2>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 text-sm font-medium hover:bg-red-500/30 transition-colors">
          <Plus className="w-4 h-4" /> Record New Incident
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 w-full max-w-lg mx-4 space-y-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100">Record New Incident Report</h3>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Institution *</label>
                <select required value={form.institution} onChange={e => setForm(f => ({ ...f, institution: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50">
                  <option value="">Select institution…</option>
                  {institutions.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Affected Service *</label>
                  <select required value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50">
                    <option value="">Select…</option>
                    {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Severity Level *</label>
                  <select value={form.severity} onChange={e => setForm(f => ({ ...f, severity: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50">
                    {SEVERITIES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Incident Description *</label>
                <textarea required rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 resize-none" placeholder="Describe the incident…" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Reported By *</label>
                <select required value={form.reportedBy} onChange={e => setForm(f => ({ ...f, reportedBy: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50">
                  <option value="">Select member…</option>
                  {TASKFORCE_MEMBERS.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors">Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Incident log */}
      <div className="space-y-3">
        {incidents.map(inc => (
          <div key={inc.id} className="card-hover">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-orange-500/10 shrink-0 mt-0.5">
                  <FileText className="w-4 h-4 text-orange-400" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-slate-200">{inc.institution}</span>
                    <span className="text-xs text-slate-500">•</span>
                    <span className="text-xs text-slate-400">{inc.service}</span>
                    <StatusBadge status={inc.severity} />
                  </div>
                  <p className="text-sm text-slate-400 mt-1">{inc.description}</p>
                  <p className="text-xs text-slate-500 mt-2">Reported by <span className="text-slate-400">{inc.reportedBy}</span> at {new Date(inc.timestamp).toLocaleString('en-MY')}</p>
                </div>
              </div>
              <span className="text-xs text-slate-500 shrink-0 font-mono">{inc.id}</span>
            </div>
          </div>
        ))}
        {incidents.length === 0 && <p className="text-center text-slate-500 py-8">No incidents recorded yet.</p>}
      </div>
    </div>
  );
}
