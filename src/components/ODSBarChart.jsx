import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList } from 'recharts';
import { ODS_INFO } from '../data/ods.js';
import { getODSCounts } from '../utils/dataUtils.js';
import { useMemo } from 'react';

export default function ODSBarChart({ atividades }) {
  const data = useMemo(() => {
    const counts = getODSCounts(atividades);
    return Object.entries(counts)
      .map(([ods, count]) => ({
        ods: `ODS ${ods}`,
        nome: ODS_INFO[ods]?.nome || '',
        count,
        cor: ODS_INFO[ods]?.cor || '#999',
      }))
      .sort((a, b) => b.count - a.count);
  }, [atividades]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="chart-tooltip">
          <p className="tooltip-label">{d.ods}</p>
          <p className="tooltip-name">{d.nome}</p>
          <p className="tooltip-value">{d.count} projeto{d.count > 1 ? 's' : ''}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h3>Projetos por ODS</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis type="number" allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="ods"
            width={60}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={22}>
            {data.map((entry, idx) => (
              <Cell key={idx} fill={entry.cor} />
            ))}
            <LabelList dataKey="count" position="right" style={{ fontSize: 12, fontWeight: 600 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
