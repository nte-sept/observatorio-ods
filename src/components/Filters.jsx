import { Search, SlidersHorizontal } from 'lucide-react';
import { getUniqueTypes, getUniqueAreas } from '../utils/dataUtils.js';
import { ODS_LIST } from '../data/ods.js';

export default function Filters({ filters, setFilters }) {
  const types = getUniqueTypes();
  const areas = getUniqueAreas();

  const toggleODS = (num) => {
    const current = filters.ods || [];
    if (current.includes(num)) {
      setFilters({ ...filters, ods: current.filter(o => o !== num) });
    } else {
      setFilters({ ...filters, ods: [...current, num] });
    }
  };

  const clearAll = () => {
    setFilters({ tipo: 'Todos', area: 'Todas', ods: [], search: '' });
  };

  const hasFilters =
    (filters.tipo && filters.tipo !== 'Todos') ||
    (filters.area && filters.area !== 'Todas') ||
    (filters.ods && filters.ods.length > 0) ||
    filters.search;

  return (
    <div className="filters">
      <div className="filters-header">
        <SlidersHorizontal size={20} />
        <h3>Filtros</h3>
        {hasFilters && (
          <button className="btn-clear" onClick={clearAll}>
            Limpar filtros
          </button>
        )}
      </div>

      <div className="filters-row">
        <div className="filter-group">
          <label>🔍 Busca</label>
          <div className="search-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Buscar por nome, descrição, palavra-chave..."
              value={filters.search || ''}
              onChange={e => setFilters({ ...filters, search: e.target.value })}
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Tipo de Atividade</label>
          <select
            value={filters.tipo || 'Todos'}
            onChange={e => setFilters({ ...filters, tipo: e.target.value })}
          >
            <option value="Todos">Todos os tipos</option>
            {types.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Área Temática</label>
          <select
            value={filters.area || 'Todas'}
            onChange={e => setFilters({ ...filters, area: e.target.value })}
          >
            <option value="Todas">Todas as áreas</option>
            {areas.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-group ods-filter-group">
        <label>ODS (clique para selecionar múltiplas)</label>
        <div className="ods-chips">
          {ODS_LIST.map(ods => {
            const active = (filters.ods || []).includes(ods.numero);
            return (
              <button
                key={ods.numero}
                className={`ods-chip ${active ? 'active' : ''}`}
                style={{
                  borderColor: ods.cor,
                  backgroundColor: active ? ods.cor : 'transparent',
                  color: active ? '#fff' : ods.cor,
                }}
                onClick={() => toggleODS(ods.numero)}
                title={ods.nome}
              >
                <span>{ods.icone}</span>
                <span>ODS {ods.numero}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
