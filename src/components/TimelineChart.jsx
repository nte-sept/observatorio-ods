import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Cell, LabelList
} from 'recharts';
import { getTimelineData } from '../utils/dataUtils.js';
import { useMemo } from 'react';

export default function TimelineChart({ atividades }) {
  const data = useMemo(() => getTimelineData(atividades), [atividades]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{d.month}</p>
          <p className="tooltip-value">{d.count} início{d.count > 1 ? 's' : ''} de projeto</p>
        </div>
      );
    }
    return null;
  };

  if (data.length === 0) return null;

  return (
    <div className="chart-container">
      <h3>Início de Projetos ao Longo do Tempo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 40 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis
            dataKey="month"
            angle={-45}
            textAnchor="end"
            tick={{ fontSize: 11 }}
            height={60}
          />
          <YAxis allowDecimals={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" fill="#C5192D" radius={[8, 8, 0, 0]} barSize={30}>
            {data.map((entry, idx) => (
              <Cell key={idx} fill={idx % 2 === 0 ? '#C5192D' : '#FD6925'} />
            ))}
            <LabelList dataKey="count" position="top" style={{ fontSize: 11, fontWeight: 600 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
