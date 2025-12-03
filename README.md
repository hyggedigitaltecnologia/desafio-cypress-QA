# Desafio Cypress QA — Entrega Final

Este repositório contém a automação de testes E2E desenvolvida em Cypress para o site: `https://www.netshoes.com.br`.

Este README é a versão final preparada para entrega do desafio. Contém instruções para instalação, execução, geração de relatórios e informações sobre o CI configurado.

## O que está neste repositório

- Testes end-to-end focados no fluxo de carrinho (buscar produto, adicionar ao carrinho, visualizar/remover item).
- Padrão Page Object para organização das páginas (`cypress/support/pages`).
- Comandos customizados no arquivo `cypress/support/commands.js`.
- Integração com Allure Report e captura de vídeos/screenshots por execução.
- Workflows GitHub Actions para execução automática (push/PR) e execução manual (workflow_dispatch).

## Requisitos

- Node.js (v16+ recomendado)
- npm ou yarn

## Instalação

No diretório do projeto:

```bash
npm ci
```

ou, se usar yarn:

```bash
yarn
```

## Executando os testes localmente

- Abrir Cypress (modo interativo):

```bash
npm run cy:open
```

- Executar em modo headless (CI):

```bash
npm test
# ou
npm run cy:run
```

- Executar em um navegador específico (ex.: chrome):

```bash
npx cypress run --browser chrome
```

## Screenshots e vídeos

- O projeto grava vídeos e screenshots de cada execução. Por padrão esses artefatos não são versionados; veja o `.gitignore`.
- Estrutura local pós-execução:

```
cypress/videos/              # vídeo por spec
cypress/screenshots/         # screenshots organizadas por teste
allure-results/              # resultados gerados para Allure
allure-report/               # relatório HTML gerado (após allure generate)
```

## Allure Report

- Gerar o relatório HTML a partir dos resultados:

```bash
npm run allure:generate
npm run allure:report   # gera e abre o relatório
```

Observação: o diretório `allure-results/` é preenchido automaticamente pela execução dos testes quando o plugin do Allure está ativo.

## GitHub Actions

- `/.github/workflows/automation-tests.yml`: roda automaticamente em push/PR e gera artefatos (vídeos, screenshots, Allure).
- `/.github/workflows/manual-tests.yml`: execução manual via UI do GitHub (workflow_dispatch) com opções de escopo e navegador.