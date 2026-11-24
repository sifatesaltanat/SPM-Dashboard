import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ShieldAlert, Plus, X, ArrowUpDown } from 'lucide-react';

function getPriority(score) {
  if (score >= 20) return 'Critical';
  if (score >= 12) return 'High';
  if (score >= 6) return 'Medium';
  return 'Low';
}

function PriorityBadge({ score }) {
  const p = getPriority(score);
  const cls = { Critical: 'badge-critical', High: 'badge-high', Medium: 'badge-medium', Low: 'badge-low' }[p];
  return <span className={`${cls} text-xs font-semibold px-2.5 py-0.5 rounded-full`}>{p}</span>;
}

function ScoreBar({ value, max = 5, color }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-xs font-mono text-slate-300 w-4 text-right">{value}</span>
      <div className="flex gap-0.5">
        {Array.from({ length: max }, (_, i) => (
          <div key={i} className={`w-3 h-3 rounded-sm ${i < value ? color : 'bg-slate-800'}`} />
        ))}
      </div>
    </div>
  );
}

const CATEGORIES = ['Operational', 'Security', 'Technical', 'Strategic', 'Compliance'];
const STATUSES = ['Active', 'Mitigating', 'Monitoring', 'Closed'];

export default function RiskPage() {
  const { risks, addRisk, updateRisk } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState('score');
  const [form, setForm] = useState({ title: '', category: 'Operational', likelihood: 3, impact: 3, owner: '', mitigation: '', status: 'Active' });

  const sorted = [...risks].sort((a, b) => {
    if (sortBy === 'score') return (b.likelihood * b.impact) - (a.likelihood * a.impact);
    if (sortBy === 'likelihood') return b.likelihood - a.likelihood;
    if (sortBy === 'impact') return b.impact - a.impact;
    return 0;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addRisk(form);
    setForm({ title: '', category: 'Operational', likelihood: 3, impact: 3, owner: '', mitigation: '', status: 'Active' });
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-purple-400" /> Risk Assessment & Prioritisation Matrix
        </h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <ArrowUpDown className="w-3.5 h-3.5" /> Sort:
            {['score', 'likelihood', 'impact'].map(s => (
              <button key={s} onClick={() => setSortBy(s)} className={`px-2 py-1 rounded text-xs capitalize ${sortBy === s ? 'bg-blue-500/20 text-blue-400' : 'text-slate-400 hover:text-slate-200'}`}>{s}</button>
            ))}
          </div>
          <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30 text-sm font-medium hover:bg-purple-500/30 transition-colors">
            <Plus className="w-4 h-4" /> Add Risk
          </button>
        </div>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 w-full max-w-lg mx-4 space-y-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100">Add New Risk</h3>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Risk Title *</label>
                <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50" placeholder="Describe the risk…" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50">
                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Likelihood (1-5) *</label>
                  <input type="range" min={1} max={5} value={form.likelihood} onChange={e => setForm(f => ({ ...f, likelihood: Number(e.target.value) }))} className="w-full accent-purple-500" />
                  <p className="text-center text-sm text-purple-400 font-bold">{form.likelihood}</p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Impact (1-5) *</label>
                  <input type="range" min={1} max={5} value={form.impact} onChange={e => setForm(f => ({ ...f, impact: Number(e.target.value) }))} className="w-full accent-red-500" />
                  <p className="text-center text-sm text-red-400 font-bold">{form.impact}</p>
                </div>
              </div>
              <div className="text-center">
                <span className="text-xs text-slate-400">Risk Score: </span>
                <span className="text-lg font-bold text-slate-100">{form.likelihood * form.impact}</span>
                <span className="text-xs text-slate-400"> / 25 → </span>
                <PriorityBadge score={form.likelihood * form.impact} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Owner *</label>
                <input required value={form.owner} onChange={e => setForm(f => ({ ...f, owner: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50" placeholder="Risk owner…" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Mitigation Strategy</label>
                <textarea rows={2} value={form.mitigation} onChange={e => setForm(f => ({ ...f, mitigation: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 resize-none" placeholder="How to mitigate…" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-purple-500 text-white text-sm font-medium hover:bg-purple-600 transition-colors">Add Risk</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Risk register table */}
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700/50">
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Risk</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Category</th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Likelihood</th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Impact</th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Score</th>
              <th className="text-center py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Priority</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Owner</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map(r => {
              const score = r.likelihood * r.impact;
              return (
                <tr key={r.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                  <td className="py-3 px-4">
                    <p className="font-medium text-slate-200">{r.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{r.mitigation}</p>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-400">{r.category}</td>
                  <td className="py-3 px-4"><ScoreBar value={r.likelihood} color="bg-purple-500" /></td>
                  <td className="py-3 px-4"><ScoreBar value={r.impact} color="bg-red-500" /></td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-lg font-bold text-slate-100">{score}</span>
                    <span className="text-xs text-slate-500">/25</span>
                  </td>
                  <td className="py-3 px-4 text-center"><PriorityBadge score={score} /></td>
                  <td className="py-3 px-4 text-xs text-slate-400">{r.owner}</td>
                  <td className="py-3 px-4">
                    <select value={r.status} onChange={e => updateRisk(r.id, { status: e.target.value })} className="rounded bg-slate-800 border border-slate-700 px-2 py-1 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50">
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
