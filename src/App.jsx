import { useState, useMemo } from 'react';
import atividades from './data/activities.js';
import { filterActivities } from './utils/dataUtils.js';
import SummaryCards from './components/SummaryCards.jsx';
import Filters from './components/Filters.jsx';
import ODSBarChart from './components/ODSBarChart.jsx';
import ODSCooccurrence from './components/ODSCooccurrence.jsx';
import ODSNetwork from './components/ODSNetwork.jsx';
import ActivityTypeChart from './components/ActivityTypeChart.jsx';
import ThematicAreaChart from './components/ThematicAreaChart.jsx';
import TimelineChart from './components/TimelineChart.jsx';
import ProjectsTable from './components/ProjectsTable.jsx';
import { Target, BarChart3 } from 'lucide-react';
import './App.css';

function App() {
  const [filters, setFilters] = useState({
    tipo: 'Todos',
    area: 'Todas',
    ods: [],
    search: '',
  });

  const [activeTab, setActiveTab] = useState('overview');

  const filtered = useMemo(() => filterActivities(filters), [filters]);

  const handleODSClick = (odsNum) => {
    const current = filters.ods || [];
    if (current.includes(odsNum)) {
      setFilters({ ...filters, ods: current.filter(o => o !== odsNum) });
    } else {
      setFilters({ ...filters, ods: [...current, odsNum] });
      setActiveTab('overview');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: <BarChart3 size={16} /> },
    { id: 'ods', label: 'Foco nas ODS', icon: <Target size={16} /> },
    { id: 'table', label: 'Tabela de Atividades', icon: null },
  ];

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo">
              <Target size={32} />
              <div>
                <h1>Painel de Extensão & ODS</h1>
                <span className="subtitle">
                  Setor de Educação Profissional e Tecnológica · UFPR
                </span>
              </div>
            </div>
          </div>
          <div className="header-right">
            <span className="header-badge">
              {atividades.length} atividades registradas
            </span>
          </div>
        </div>
      </header>

      <main className="app-main">
        <section className="tabs-bar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </section>

        <Filters filters={filters} setFilters={setFilters} />
        <SummaryCards atividades={filtered} />

        {activeTab === 'overview' && (
          <div className="charts-grid">
            <div className="chart-card full-width">
              <TimelineChart atividades={filtered} />
            </div>
            <div className="chart-card">
              <ActivityTypeChart atividades={filtered} />
            </div>
            <div className="chart-card">
              <ThematicAreaChart atividades={filtered} />
            </div>
            <div className="chart-card full-width">
              <ODSBarChart atividades={filtered} />
            </div>
          </div>
        )}

        {activeTab === 'ods' && (
          <div className="ods-focus">
            <div className="ods-hero">
              <h2>🎯 Foco nas ODS</h2>
              <p>
                Os Objetivos de Desenvolvimento Sustentável (ODS) da ONU são uma
                agenda global com 17 objetivos. Abaixo, exploramos como as
                atividades de extensão do SEPT se relacionam com cada ODS e como
                elas se interconectam nos projetos.
              </p>
            </div>
            <div className="chart-card full-width">
              <ODSNetwork
                atividades={filtered}
                activeODS={filters.ods}
                onODSClick={handleODSClick}
              />
            </div>
            <div className="chart-card full-width">
              <ODSBarChart atividades={filtered} />
            </div>
            <div className="chart-card full-width">
              <ODSCooccurrence atividades={filtered} />
            </div>
          </div>
        )}

        {activeTab === 'table' && (
          <ProjectsTable atividades={filtered} />
        )}
      </main>

      <footer className="app-footer">
        <p>
          Painel de Extensão & ODS · SEPT/UFPR · Dados atualizados em junho/2026
        </p>
      </footer>
    </div>
  );
}

export default App;
