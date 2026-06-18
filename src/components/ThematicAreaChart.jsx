import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { getAreaCounts } from '../utils/dataUtils.js';
import { useMemo } from 'react';

const COLORS = ['#FD6925', '#4C9F38', '#26BDE2', '#A21942', '#DD1367', '#19486A', '#C5192D', '#FCC30B'];

export default function ThematicAreaChart({ atividades }) {
  const data = useMemo(() => {
    const counts = getAreaCounts(atividades);
    return Object.entries(counts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [atividades]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{d.name}</p>
          <p className="tooltip-value">{d.value} projeto{d.value > 1 ? 's' : ''}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3>Projetos por Área Temática</h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 25, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis type="number" allowDecimals={false} />
          <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 12 }} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={22}>
            {data.map((_, idx) => (
              <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
            ))}
            <LabelList dataKey="value" position="right" style={{ fontSize: 12, fontWeight: 600 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
