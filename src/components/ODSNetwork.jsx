import { ODS_INFO } from '../data/ods.js';

export default function ODSNetwork({ atividades, onODSClick, activeODS }) {
  const odsCounts = {};
  const odsProjects = {};
  atividades.forEach(a => {
    a.ods.forEach(o => {
      odsCounts[o] = (odsCounts[o] || 0) + 1;
      if (!odsProjects[o]) odsProjects[o] = [];
      odsProjects[o].push(a);
    });
  });

  const odsList = Object.keys(odsCounts)
    .map(Number)
    .sort((a, b) => a - b);

  const maxCount = Math.max(1, ...Object.values(odsCounts));

  if (odsList.length === 0) return null;

  return (
    <div className="chart-container">
      <h3>📊 Panorama das ODS no SEPT</h3>
      <p className="chart-subtitle">
        Tamanho proporcional ao número de projetos. Clique para ver os detalhes de cada ODS.
      </p>
      <div className="ods-bubbles">
        {odsList.map(ods => {
          const info = ODS_INFO[ods] || { nome: 'Desconhecida', cor: '#999', icone: '?' };
          const count = odsCounts[ods];
          const size = 70 + (count / maxCount) * 110;
          const isSelected = activeODS?.includes(ods);
          return (
            <div key={ods} className="ods-bubble-group">
              <div
                className={`ods-bubble ${isSelected ? 'selected' : ''}`}
                onClick={() => onODSClick?.(ods)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') onODSClick?.(ods); }}
                style={{
                  width: size,
                  height: size,
                  backgroundColor: isSelected ? info.cor : info.cor + '20',
                  borderColor: info.cor,
                  color: isSelected ? '#fff' : 'inherit',
                }}
                title={`${info.nome}: ${count} projeto(s) — Clique para filtrar`}
              >
                <span className="bubble-ods-num">{ods}</span>
                <span className="bubble-count">{count}</span>
              </div>
              <span
                className="bubble-label"
                style={{ color: info.cor }}
              >
                {info.nome}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
