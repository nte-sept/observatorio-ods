import { useMemo } from 'react';
import { ODS_INFO } from '../data/ods.js';
import { getODSCooccurrence } from '../utils/dataUtils.js';

export default function ODSCooccurrence({ atividades }) {
  const { matrix, odsList } = useMemo(
    () => getODSCooccurrence(atividades),
    [atividades]
  );

  const filteredOds = odsList.filter(o => ODS_INFO[o]);
  const maxVal = Math.max(1, ...Object.values(matrix));

  if (filteredOds.length === 0) return null;

  return (
    <div className="chart-container">
      <h3>Co-ocorrência de ODS nos Projetos</h3>
      <p className="chart-subtitle">
        Quais ODS aparecem juntas nos mesmos projetos? Quanto mais intensa a cor, mais projetos conectam aquelas ODS.
      </p>
      <div className="heatmap-wrapper">
        <div className="heatmap-scroll">
          <table className="heatmap">
            <thead>
              <tr>
                <th></th>
                {filteredOds.map(o => (
                  <th key={o} style={{ color: ODS_INFO[o].cor }}>
                    <div className="heatmap-header">
                      <span>{ODS_INFO[o].icone}</span>
                      <span>ODS {o}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredOds.map(o1 => (
                <tr key={o1}>
                  <td style={{ color: ODS_INFO[o1].cor, fontWeight: 600 }}>
                    <div className="heatmap-row-label">
                      <span>{ODS_INFO[o1].icone}</span>
                      <span>ODS {o1}</span>
                    </div>
                  </td>
                  {filteredOds.map(o2 => {
                    if (o1 === o2) {
                      return <td key={o2} className="heatmap-cell heatmap-self" />;
                    }
                    const key = [o1, o2].sort().join('-');
                    const val = matrix[key] || 0;
                    const intensity = val / maxVal;
                    const bg = o1 < o2
                      ? `rgba(197, 25, 45, ${0.1 + intensity * 0.8})`
                      : 'transparent';
                    return (
                      <td
                        key={o2}
                        className="heatmap-cell"
                        style={{ backgroundColor: bg }}
                        title={`${ODS_INFO[o1].nome} + ${ODS_INFO[o2].nome}: ${val} projeto(s)`}
                      >
                        {val > 0 ? val : ''}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="heatmap-legend">
        <span>Menos</span>
        <div className="legend-gradient" />
        <span>Mais</span>
      </div>
    </div>
  );
}
