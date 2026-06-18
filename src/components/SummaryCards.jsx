import { Activity, Calendar, Users, Target } from 'lucide-react';
import { useMemo } from 'react';
export default function SummaryCards({ atividades }) {
  const stats = useMemo(() => {
    const total = atividades.length;
    const now = new Date();
    const active = atividades.filter(a => {
      if (!a.fim) return true;
      const parts = a.fim.split('/');
      if (parts.length < 3) return true;
      const end = new Date(+parts[2], +parts[1] - 1, +parts[0]);
      return end >= now;
    }).length;
    const totalODS = new Set(atividades.flatMap(a => a.ods)).size;
    const types = new Set(atividades.map(a => a.tipo)).size;
    const avgODS = (atividades.reduce((s, a) => s + a.ods.length, 0) / total).toFixed(1);
    return { total, active, totalODS, types, avgODS };
  }, [atividades]);

  const cards = [
    {
      label: 'Total de Atividades',
      value: stats.total,
      icon: <Activity size={24} />,
      color: '#C5192D',
      bg: '#fce4e8',
    },
    {
      label: 'Atividades Vigentes',
      value: stats.active,
      icon: <Calendar size={24} />,
      color: '#4C9F38',
      bg: '#e8f5e9',
    },
    {
      label: 'ODS Atendidas',
      value: stats.totalODS,
      icon: <Target size={24} />,
      color: '#FD6925',
      bg: '#fff3e0',
    },
    {
      label: 'Média ODS / Projeto',
      value: stats.avgODS,
      icon: <Users size={24} />,
      color: '#19486A',
      bg: '#e3f2fd',
    },
    {
      label: 'Tipos de Atividades',
      value: stats.types,
      icon: <Activity size={24} />,
      color: '#DD1367',
      bg: '#fce4ec',
    },
  ];

  return (
    <div className="summary-cards">
      {cards.map((card, idx) => (
        <div key={idx} className="summary-card" style={{ borderTopColor: card.color }}>
          <div className="card-icon" style={{ backgroundColor: card.bg, color: card.color }}>
            {card.icon}
          </div>
          <div className="card-info">
            <span className="card-value" style={{ color: card.color }}>{card.value}</span>
            <span className="card-label">{card.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
