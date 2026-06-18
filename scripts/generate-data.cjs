const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const csv = fs.readFileSync(
  path.join(__dirname, '..', '..', 'extensao_atividades.csv'),
  'utf-8'
);

const result = Papa.parse(csv, {
  header: true,
  skipEmptyLines: true,
  trimHeaders: true,
  trim: false,
});

function parseODS(odsStr) {
  if (!odsStr || odsStr.trim() === '') return [];
  const parts = odsStr.split(';');
  return parts.map(p => {
    const match = p.trim().match(/^(\d+)/);
    return match ? parseInt(match[1]) : null;
  }).filter(n => n !== null);
}

const activities = result.data.map(row => {
  const rawName = (row['Atividade (Código Extensão)'] || '').trim();
  const nameMatch = rawName.match(/^(.*?)\s*\((\d+)\)\s*$/);
  const nome = nameMatch ? nameMatch[1].trim() : rawName;
  const codigo = nameMatch ? nameMatch[2] : '';

  const ods = parseODS(row['ODS'] || '');

  const keywords = row['Palavras-Chave']
    ? row['Palavras-Chave'].split(';').map(k => k.trim()).filter(Boolean)
    : [];

  return {
    nome,
    codigo,
    tipo: (row['Tipo'] || '').trim(),
    inicio: (row['Previsão - Início'] || '').trim(),
    fim: (row['Previsão - Fim'] || '').trim(),
    coordenador: (row['Coordenador(a)/Vice'] || '').trim(),
    palavrasChave: keywords,
    publicoAlvo: (row['Público Alvo'] || '').trim(),
    ods,
    descricao: (row['Descrição'] || '').trim(),
    unidadeGestora: (row['Unidade Gestora (Dept./Setor)'] || '').trim(),
    areaTematica: (row['Área Temática'] || '').trim(),
    instituicao: (row['Instituição'] || '').trim(),
    // email e telefone omitidos intencionalmente — dados sensíveis
  };
});

const output = `// Auto-generated from extensao_atividades.csv (parsed with PapaParse)
// Email e telefone foram omitidos — dados sensíveis de pessoas físicas
const atividades = ${JSON.stringify(activities, null, 2)};

export default atividades;
`;

fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'data', 'activities.js'),
  output,
  'utf-8'
);

console.log(`✅ Generated src/data/activities.js with ${activities.length} entries (no email/phone)`);
