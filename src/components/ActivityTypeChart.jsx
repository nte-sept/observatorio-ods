import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getTypeCounts } from '../utils/dataUtils.js';
import { useMemo } from 'react';

const COLORS = ['#C5192D', '#FD6925', '#26BDE2', '#4C9F38', '#A21942', '#DD1367', '#19486A'];

export default function ActivityTypeChart({ atividades }) {
  const data = useMemo(() => {
    const counts = getTypeCounts(atividades);
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [atividades]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0];
      const total = data.reduce((s, x) => s + x.value, 0);
      const pct = ((d.value / total) * 100).toFixed(1);
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{d.name}</p>
          <p className="tooltip-value">{d.value} projeto{d.value > 1 ? 's' : ''} ({pct}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3>Distribuição por Tipo de Atividade</h3>
      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
            label={({ name, value }) => `${name.split(' ')[0]}: ${value}`}
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} stroke="#fff" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
