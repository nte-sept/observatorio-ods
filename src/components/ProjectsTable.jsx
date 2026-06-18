import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { ODS_INFO } from '../data/ods.js';

export default function ProjectsTable({ atividades }) {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (idx) => {
    setExpanded(expanded === idx ? null : idx);
  };

  if (atividades.length === 0) {
    return (
      <div className="chart-container">
        <h3>Atividades</h3>
        <p className="empty-state">Nenhuma atividade encontrada com os filtros atuais.</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3>Atividades ({atividades.length})</h3>
      <div className="projects-table-wrapper">
        <table className="projects-table">
          <thead>
            <tr>
              <th></th>
              <th>Atividade</th>
              <th>Tipo</th>
              <th>Área</th>
              <th>ODS</th>
              <th>Coordenador(a)</th>
              <th>Vigência</th>
            </tr>
          </thead>
          <tbody>
            {atividades.map((a, idx) => {
              const isOpen = expanded === idx;
              return (
                <>
                  <tr
                    key={a.codigo || idx}
                    className={`project-row ${isOpen ? 'expanded' : ''}`}
                    onClick={() => toggleExpand(idx)}
                  >
                    <td>
                      {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </td>
                    <td className="project-name">{a.nome}</td>
                    <td><span className="badge badge-type">{a.tipo}</span></td>
                    <td><span className="badge badge-area">{a.areaTematica || '-'}</span></td>
                    <td>
                      <div className="ods-mini">
                        {a.ods.map(o => (
                          <span
                            key={o}
                            className="ods-dot"
                            style={{ backgroundColor: ODS_INFO[o]?.cor || '#999' }}
                            title={ODS_INFO[o]?.nome || ''}
                          >
                            {o}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="coordinator-cell">{a.coordenador.split('/')[0]}</td>
                    <td className="date-cell">
                      {a.inicio ? a.inicio : '-'} → {a.fim ? a.fim : '-'}
                    </td>
                  </tr>
                  {isOpen && (
                    <tr key={`detail-${idx}`} className="project-detail-row">
                      <td colSpan={7}>
                        <div className="project-detail">
                          <div className="detail-section">
                            <h4>Descrição</h4>
                            <p>{a.descricao || 'Sem descrição disponível.'}</p>
                          </div>
                          <div className="detail-grid">
                            <div className="detail-item">
                              <strong>Código:</strong> {a.codigo || '-'}
                            </div>
                            <div className="detail-item">
                              <strong>Coordenador(a)/Vice:</strong> {a.coordenador || '-'}
                            </div>
                            <div className="detail-item">
                              <strong>Instituição:</strong> {a.instituicao || '-'}
                            </div>
                            <div className="detail-item">
                              <strong>Unidade Gestora:</strong> {a.unidadeGestora || '-'}
                            </div>
                          </div>
                          {a.palavrasChave.length > 0 && (
                            <div className="detail-section">
                              <h4>Palavras-Chave</h4>
                              <div className="keyword-chips">
                                {a.palavrasChave.map((k, i) => (
                                  <span key={i} className="keyword-chip">{k}</span>
                                ))}
                              </div>
                            </div>
                          )}
                          <div className="detail-section">
                            <h4>ODS Atendidas</h4>
                            <div className="ods-detail-chips">
                              {a.ods.map(o => (
                                <span
                                  key={o}
                                  className="ods-detail-chip"
                                  style={{ backgroundColor: ODS_INFO[o]?.cor || '#999' }}
                                >
                                  {ODS_INFO[o]?.icone} ODS {o} - {ODS_INFO[o]?.nome}
                                </span>
                              ))}
                            </div>
                          </div>
                          {a.publicoAlvo && (
                            <div className="detail-section">
                              <h4>Público-Alvo</h4>
                              <p>{a.publicoAlvo}</p>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
