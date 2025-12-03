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

## Limpeza de artefatos já versionados

Se você tiver comitado por engano pastas como `node_modules/`, `cypress/videos/`, `cypress/screenshots/` ou `allure-results/`, rode os comandos abaixo para removê-las do Git (preservando localmente):

```bash
# remover do index (preserva localmente)
git rm -r --cached node_modules || true
git rm -r --cached cypress/videos || true
git rm -r --cached cypress/screenshots || true
git rm -r --cached allure-results || true
git rm -r --cached allure-report || true

git add .gitignore
git commit -m "chore: remove artifacts from repo and update .gitignore"
git push
```

## O que foi implementado

- 3 cenários E2E para fluxo de carrinho (buscar → adicionar → remover).
- Padrão Page Object e comandos utilitários (`smartClick`, `smartType`, `waitForJsAndJQuery`).
- Captura de screenshots organizadas por nome do teste e gravação de vídeo (configurada em `cypress.config.js`).
- Integração com `@shelex/cypress-allure-plugin` e scripts `npm` para gerar/abrir o relatório Allure.
- Workflows GitHub Actions (automático e manual) para execução em CI.

## Observações finais (para entrega)

- Arquivos e pastas de artefatos (vídeos, screenshots, allure-results, node_modules) já estão listados em `.gitignore`.
- `cypress/support/pages/userPage.js` foi removido (arquivo não utilizado).
- Recomendo rodar `npm ci` em uma máquina limpa e executar `npm test` para validar a pipeline localmente antes do push final.

## Contato

Se precisar que eu crie o PR final, rode os comandos de limpeza acima e me autorize a executar o commit & push, ou eu posso te enviar os comandos prontos.

Boa sorte na entrega — se quiser, eu preparo e abro o PR com a mensagem final de envio.
