import { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { TASKFORCE_MEMBERS } from '../data/sampleData';
import { ListChecks, Plus, X, ChevronRight, Calendar, User } from 'lucide-react';

const COLUMNS = ['To Do', 'In Progress', 'Under Review', 'Done'];
const COL_COLORS = {
  'To Do':        { bg: 'bg-slate-500/10', border: 'border-slate-500/30', text: 'text-slate-400', dot: 'bg-slate-400' },
  'In Progress':  { bg: 'bg-blue-500/10',  border: 'border-blue-500/30',  text: 'text-blue-400',  dot: 'bg-blue-400' },
  'Under Review': { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400', dot: 'bg-amber-400' },
  'Done':         { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', dot: 'bg-emerald-400' },
};

function PriorityDot({ priority }) {
  const c = { Critical: 'bg-red-400', High: 'bg-orange-400', Medium: 'bg-amber-400', Low: 'bg-emerald-400' }[priority] || 'bg-slate-400';
  return <span className={`w-2 h-2 rounded-full ${c} shrink-0`} title={priority} />;
}

export default function MitigationPage() {
  const { tasks, institutions, addTask, updateTaskStatus } = useAppContext();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', assignee: '', institution: '', priority: 'High', dueDate: '', linkedIncident: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({ ...form, status: 'To Do' });
    setForm({ title: '', assignee: '', institution: '', priority: 'High', dueDate: '', linkedIncident: '' });
    setShowForm(false);
  };

  const moveNext = (task) => {
    const idx = COLUMNS.indexOf(task.status);
    if (idx < COLUMNS.length - 1) updateTaskStatus(task.id, COLUMNS[idx + 1]);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <ListChecks className="w-5 h-5 text-blue-400" /> Mitigation Task Tracker
        </h2>
        <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 text-sm font-medium hover:bg-blue-500/30 transition-colors">
          <Plus className="w-4 h-4" /> New Task
        </button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowForm(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl p-6 w-full max-w-lg mx-4 space-y-5" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-100">Create Mitigation Task</h3>
              <button onClick={() => setShowForm(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Task Title *</label>
                <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50" placeholder="What needs to be done…" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Assignee *</label>
                  <select required value={form.assignee} onChange={e => setForm(f => ({ ...f, assignee: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50">
                    <option value="">Select…</option>
                    {TASKFORCE_MEMBERS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Institution</label>
                  <select value={form.institution} onChange={e => setForm(f => ({ ...f, institution: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50">
                    <option value="">All / General</option>
                    {institutions.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Priority</label>
                  <select value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50">
                    {['Critical', 'High', 'Medium', 'Low'].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Due Date</label>
                  <input type="datetime-local" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} className="w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-blue-500/50" />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 rounded-lg text-sm text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-blue-500 text-white text-sm font-medium hover:bg-blue-600 transition-colors">Create Task</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Kanban board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {COLUMNS.map(col => {
          const colTasks = tasks.filter(t => t.status === col);
          const c = COL_COLORS[col];
          return (
            <div key={col} className="space-y-3">
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${c.bg} border ${c.border}`}>
                <span className={`w-2 h-2 rounded-full ${c.dot}`} />
                <span className={`text-sm font-semibold ${c.text}`}>{col}</span>
                <span className={`ml-auto text-xs ${c.text} opacity-70`}>{colTasks.length}</span>
              </div>
              <div className="space-y-2 min-h-[120px]">
                {colTasks.map(task => (
                  <div key={task.id} className="card-hover space-y-2 group">
                    <div className="flex items-start gap-2">
                      <PriorityDot priority={task.priority} />
                      <p className="text-sm font-medium text-slate-200 leading-snug">{task.title}</p>
                    </div>
                    <div className="flex items-center gap-3 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1"><User className="w-3 h-3" />{task.assignee}</span>
                      {task.institution && <span>• {task.institution}</span>}
                    </div>
                    {task.dueDate && (
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <Calendar className="w-3 h-3" /> {new Date(task.dueDate).toLocaleString('en-MY')}
                      </div>
                    )}
                    {col !== 'Done' && (
                      <button onClick={() => moveNext(task)} className="w-full flex items-center justify-center gap-1 py-1.5 rounded-lg text-xs font-medium text-blue-400 bg-blue-500/10 border border-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-500/20">
                        Move to {COLUMNS[COLUMNS.indexOf(col) + 1]} <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
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
