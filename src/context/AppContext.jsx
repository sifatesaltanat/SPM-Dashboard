import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  INSTITUTIONS as DEFAULT_INSTITUTIONS,
  INCIDENTS as DEFAULT_INCIDENTS,
  RISKS as DEFAULT_RISKS,
  TASKS as DEFAULT_TASKS,
  PREVENTIVE_CONTROLS as DEFAULT_CONTROLS,
  ACTIVITY_FEED as DEFAULT_FEED,
} from '../data/sampleData';

const AppContext = createContext();

function load(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function AppProvider({ children }) {
  const [institutions, setInstitutions] = useState(() => load('institutions', DEFAULT_INSTITUTIONS));
  const [incidents, setIncidents]       = useState(() => load('incidents', DEFAULT_INCIDENTS));
  const [risks, setRisks]               = useState(() => load('risks', DEFAULT_RISKS));
  const [tasks, setTasks]               = useState(() => load('tasks', DEFAULT_TASKS));
  const [controls, setControls]         = useState(() => load('controls', DEFAULT_CONTROLS));
  const [activityFeed, setActivityFeed] = useState(() => load('activityFeed', DEFAULT_FEED));

  // Persist on change
  useEffect(() => save('institutions', institutions), [institutions]);
  useEffect(() => save('incidents', incidents), [incidents]);
  useEffect(() => save('risks', risks), [risks]);
  useEffect(() => save('tasks', tasks), [tasks]);
  useEffect(() => save('controls', controls), [controls]);
  useEffect(() => save('activityFeed', activityFeed), [activityFeed]);

  // ---- Helpers ----
  const addActivity = useCallback((action, detail, user = 'Taskforce Member') => {
    const entry = {
      id: `act-${Date.now()}`,
      action, detail, user,
      timestamp: new Date().toISOString(),
    };
    setActivityFeed(prev => [entry, ...prev]);
  }, []);

  const addIncident = useCallback((inc) => {
    const full = { ...inc, id: `inc-${Date.now()}` };
    setIncidents(prev => [full, ...prev]);
    addActivity('Incident reported', `${inc.institution} — ${inc.service} (${inc.severity})`, inc.reportedBy);
    return full;
  }, [addActivity]);

  const addRisk = useCallback((risk) => {
    const full = { ...risk, id: `risk-${Date.now()}` };
    setRisks(prev => [full, ...prev]);
    addActivity('Risk added', `${risk.title} — Score ${risk.likelihood * risk.impact}`, risk.owner);
    return full;
  }, [addActivity]);

  const updateRisk = useCallback((id, updates) => {
    setRisks(prev => prev.map(r => r.id === id ? { ...r, ...updates } : r));
  }, []);

  const addTask = useCallback((task) => {
    const full = { ...task, id: `task-${Date.now()}` };
    setTasks(prev => [full, ...prev]);
    addActivity('Task created', `${task.title} → ${task.assignee}`, 'Taskforce Member');
    return full;
  }, [addActivity]);

  const updateTaskStatus = useCallback((id, newStatus) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t;
      return { ...t, status: newStatus };
    }));
    setTasks(prev => {
      const t = prev.find(x => x.id === id);
      if (t) addActivity('Task status updated', `${t.title} → ${newStatus}`, t.assignee);
      return prev;
    });
  }, [addActivity]);

  const addControl = useCallback((ctrl) => {
    const full = { ...ctrl, id: `pc-${Date.now()}` };
    setControls(prev => [full, ...prev]);
    addActivity('Preventive control added', `${ctrl.title}`, ctrl.owner);
    return full;
  }, [addActivity]);

  const updateControl = useCallback((id, updates) => {
    setControls(prev => prev.map(c => c.id === id ? { ...c, ...updates } : c));
  }, []);

  const resetData = useCallback(() => {
    setInstitutions(DEFAULT_INSTITUTIONS);
    setIncidents(DEFAULT_INCIDENTS);
    setRisks(DEFAULT_RISKS);
    setTasks(DEFAULT_TASKS);
    setControls(DEFAULT_CONTROLS);
    setActivityFeed(DEFAULT_FEED);
  }, []);

  return (
    <AppContext.Provider value={{
      institutions, incidents, risks, tasks, controls, activityFeed,
      addIncident, addRisk, updateRisk, addTask, updateTaskStatus,
      addControl, updateControl, addActivity, resetData,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
