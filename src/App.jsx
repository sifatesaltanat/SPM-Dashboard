import { useState } from 'react';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import DashboardPage from './pages/DashboardPage';
import InstitutionsPage from './pages/InstitutionsPage';
import IncidentsPage from './pages/IncidentsPage';
import RiskPage from './pages/RiskPage';
import MitigationPage from './pages/MitigationPage';
import PreventivePage from './pages/PreventivePage';

const PAGES = {
  dashboard: DashboardPage,
  institutions: InstitutionsPage,
  incidents: IncidentsPage,
  risks: RiskPage,
  mitigation: MitigationPage,
  preventive: PreventivePage,
};

export default function App() {
  const [page, setPage] = useState('dashboard');
  const PageComponent = PAGES[page] || DashboardPage;

  return (
    <div className="min-h-screen bg-slate-950">
      <Sidebar active={page} onNavigate={setPage} />
      <Header />
      <main className="ml-64 mt-14 p-6">
        <PageComponent />
      </main>
    </div>
  );
}
