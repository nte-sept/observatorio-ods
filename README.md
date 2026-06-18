# Painel de Extensão & ODS · SEPT/UFPR

Painel interativo para exploração e análise das atividades de extensão do **Setor de Educação Profissional e Tecnológica (SEPT)** da UFPR e sua relação com os **Objetivos de Desenvolvimento Sustentável (ODS)** da ONU.

🔗 **[Acessar painel](https://nte-sept.github.io/observatorio-ods/)**

---

## 📊 Visão Geral

O painel consome os dados do arquivo `extensao_atividades.csv` — exportação do sistema de extensão da UFPR — e oferece:

- **Cards de resumo**: total de atividades, vigentes, ODS atendidas, média de ODS por projeto, tipos de atividade
- **Filtros em tempo real**: busca textual, tipo de atividade, área temática e seleção múltipla de ODS
- **Gráficos interativos**: timeline de projetos, distribuição por tipo e área temática, barras por ODS
- **Seção Foco nas ODS**: panorama com bolhas proporcionais (clicáveis para filtrar), gráfico de frequência e **heatmap de co-ocorrência** — revelando quais ODS caminham juntas nos projetos
- **Tabela expansível**: lista completa com detalhes de cada atividade (descrição, palavras-chave, ODS, público-alvo) ao clicar na linha

## 🎯 Dados

| Métrica | Valor |
|---------|-------|
| Atividades registradas | 36 |
| Tipos de atividade | 5 (Projeto, Programa, Curso, Evento, Prestação de Serviços) |
| ODS atendidas | 16 das 17 oficiais + ODS 18 (Igualdade Étnico-Racial) |
| Período coberto | 2022–2031 |

### ODS mais frequentes

| # | ODS | Projetos |
|---|-----|----------|
| 4 | Educação de Qualidade | presente na maioria dos projetos |
| 9 | Indústria, Inovação e Infraestrutura | ~10 projetos |
| 8 | Trabalho Decente e Crescimento Econômico | ~8 projetos |
| 10 | Redução das Desigualdades | ~7 projetos |

## 🛠️ Stack

| Camada | Tecnologia |
|--------|------------|
| Framework | [React 19](https://react.dev) |
| Bundler | [Vite 8](https://vite.dev) |
| Gráficos | [Recharts](https://recharts.org) |
| Ícones | [Lucide React](https://lucide.dev) |
| CSV parsing | [PapaParse](https://www.papaparse.com) |
| Deploy | [GitHub Pages](https://pages.github.com) via Actions |

## 🚀 Rodar localmente

```bash
# Clone o repositório
git clone git@github.com:nte-sept/observatorio-ods.git
cd observatorio-ods/painel

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no navegador.

> **Nota**: Para desenvolvimento local, remova ou comente a linha `base: '/observatorio-ods/'` em `painel/vite.config.js`.

### Build de produção

```bash
npm run build    # gera em painel/dist/
npm run preview  # preview local da build
```

## 📁 Estrutura

```
.
├── .github/workflows/deploy.yml   # CI/CD para GitHub Pages
├── extensao_atividades.csv        # Fonte dos dados (SEPT/UFPR)
├── painel/
│   ├── public/favicon.svg
│   ├── index.html
│   ├── vite.config.js
│   └── src/
│       ├── App.jsx                # Layout principal (abas + estado)
│       ├── App.css                # Estilos
│       ├── data/
│       │   ├── activities.js      # Dados parseados do CSV
│       │   └── ods.js             # Definições das 18 ODS (cores, ícones)
│       ├── utils/
│       │   └── dataUtils.js       # Filtros, agregações, co-ocorrência
│       └── components/
│           ├── SummaryCards.jsx        # Cards de resumo
│           ├── Filters.jsx            # Barra de filtros
│           ├── TimelineChart.jsx      # Projetos ao longo do tempo
│           ├── ActivityTypeChart.jsx  # Donut por tipo
│           ├── ThematicAreaChart.jsx  # Barras por área temática
│           ├── ODSBarChart.jsx        # Barras horizontal de ODS
│           ├── ODSNetwork.jsx         # Panorama de bolhas ODS
│           ├── ODSCooccurrence.jsx    # Heatmap de co-ocorrência
│           └── ProjectsTable.jsx      # Tabela expansível
└── README.md
```

## 🔄 Atualizar dados

Para atualizar os dados com um novo CSV:

```bash
cd painel
node scripts/generate-data.cjs   # gera src/data/activities.js a partir de ../extensao_atividades.csv
npm run build
```

O script `scripts/generate-data.cjs` usa PapaParse para parsing robusto de CSV (suporta campos com vírgulas, quebras de linha e aspas escapadas).

> ⚠️ **Privacidade**: O script omite intencionalmente os campos `Email` e `Telefone` do CSV — apenas os nomes de coordenadores(as) são preservados como informação pública institucional.

## 🌐 Deploy

O deploy é automático via GitHub Actions. Ao fazer push para `main`:

1. O workflow instala dependências e faz o build
2. O artefato é enviado para GitHub Pages
3. O site fica disponível em `https://nte-sept.github.io/observatorio-ods/`

Também é possível disparar manualmente pela aba **Actions** → **Deploy to GitHub Pages** → **Run workflow**.

## 📄 Licença

Este projeto é mantido pelo **NTE/SEPT — UFPR**. Dados institucionais da Universidade Federal do Paraná.
