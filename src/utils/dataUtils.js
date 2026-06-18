import atividades from '../data/activities.js';

export function getUniqueTypes() {
  return [...new Set(atividades.map(a => a.tipo))].sort();
}

export function getUniqueAreas() {
  return [...new Set(atividades.map(a => a.areaTematica).filter(Boolean))].sort();
}

export function getODSCounts(acts) {
  const counts = {};
  (acts || atividades).forEach(a => {
    a.ods.forEach(o => {
      counts[o] = (counts[o] || 0) + 1;
    });
  });
  return counts;
}

export function getTypeCounts(acts) {
  const counts = {};
  (acts || atividades).forEach(a => {
    const t = a.tipo || 'Não informado';
    counts[t] = (counts[t] || 0) + 1;
  });
  return counts;
}

export function getAreaCounts(acts) {
  const counts = {};
  (acts || atividades).forEach(a => {
    const area = a.areaTematica || 'Não informada';
    counts[area] = (counts[area] || 0) + 1;
  });
  return counts;
}

export function getODSCooccurrence(acts) {
  const matrix = {};
  const odsList = [];
  (acts || atividades).forEach(a => {
    for (let i = 0; i < a.ods.length; i++) {
      const o1 = a.ods[i];
      if (!odsList.includes(o1)) odsList.push(o1);
      for (let j = i + 1; j < a.ods.length; j++) {
        const o2 = a.ods[j];
        if (!odsList.includes(o2)) odsList.push(o2);
        const key = [o1, o2].sort().join('-');
        matrix[key] = (matrix[key] || 0) + 1;
      }
    }
  });
  return { matrix, odsList: odsList.sort((a, b) => a - b) };
}

export function getTimelineData(acts) {
  const months = {};
  (acts || atividades).forEach(a => {
    if (!a.inicio) return;
    const parts = a.inicio.split('/');
    if (parts.length < 2) return;
    const key = `${parts[1]}/${parts[2]}`;
    months[key] = (months[key] || 0) + 1;
  });
  return Object.entries(months)
    .sort(([a], [b]) => {
      const [ma, ya] = a.split('/');
      const [mb, yb] = b.split('/');
      return ya - yb || ma - mb;
    })
    .map(([month, count]) => ({ month, count }));
}

export function filterActivities(filters) {
  return atividades.filter(a => {
    if (filters.tipo && filters.tipo !== 'Todos' && a.tipo !== filters.tipo) return false;
    if (filters.area && filters.area !== 'Todas' && a.areaTematica !== filters.area) return false;
    if (filters.ods && filters.ods.length > 0) {
      if (!filters.ods.some(o => a.ods.includes(o))) return false;
    }
    if (filters.search) {
      const s = filters.search.toLowerCase();
      const haystack = [
        a.nome, a.descricao, a.coordenador,
        ...a.palavrasChave, a.publicoAlvo
      ].join(' ').toLowerCase();
      if (!haystack.includes(s)) return false;
    }
    return true;
  });
}

export function getActiveCount() {
  const now = new Date();
  return atividades.filter(a => {
    if (!a.fim) return true;
    const parts = a.fim.split('/');
    if (parts.length < 3) return true;
    const end = new Date(+parts[2], +parts[1] - 1, +parts[0]);
    return end >= now;
  }).length;
}

export default atividades;
