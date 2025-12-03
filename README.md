# Desafio Cypress QA - Netshoes

Este repositório contém automação de testes com Cypress focado no site: `https://www.netshoes.com.br/`.

## Objetivo

Automatizar cenários de fluxo de carrinho (busca, adição de produto, remoção) aplicando boas práticas modernas de testes front-end com Cypress, reutilizando padrões de code Java robustos.

## Como instalar

Pré-requisitos: Node.js e npm instalados.

No diretório do projeto, execute:

```bash
npm install
```

## Como rodar os testes

- Abrir a interface do Cypress (para desenvolvimento e debug):

```bash
npm run cy:open
```

- Executar os testes em modo CI (headless):

```bash
npm test
```

Você pode fornecer variáveis de ambiente para testes (ex.: `TEST_USER_EMAIL`, `TEST_USER_PASSWORD`) usando `cypress.env.json` ou via `CYPRESS_TEST_USER_EMAIL` no ambiente.

## Estrutura e boas práticas aplicadas

- `cypress/e2e/netshoes-carrinho.spec.js`: testes end-to-end para fluxo de carrinho.
- `cypress/support/pages/`: page objects (HomePage, SearchResultPage, ProductPage, CartPage) baseados em padrões Java robustos.
- `cypress/support/commands.js`: comandos customizados reutilizáveis (`smartClick`, `smartType`, `waitForJsAndJQuery`).
- `cypress.config.js`: baseUrl apontando para Netshoes, viewport desktop (1920x1080), timeout robusto.

A estrutura segue os mesmos padrões aplicados no código Java fornecido:
- Page Objects para encapsular seletores e ações
- Métodos reutilizáveis com tratamento de exceções
- Waits implícitos e explícitos para elementos DOM dinâmicos
- Fallback para JavaScript click quando click padrão falha

## Cenários automatizados (escolhas e justificativa)

### 1. Buscar um produto e adicioná-lo ao carrinho
- **Fluxo**: Home > Pesquisar "Tênis" > Clicar no primeiro produto > Selecionar tamanho (se houver) > Clicar "Comprar" > Validar notificação de sucesso.
- **Justificativa**: Cenário core de qualquer e-commerce. Valida integração entre busca, página de produto e adição ao carrinho.

### 2. Abrir carrinho via mini cart e validar itens
- **Fluxo**: Adicionar produto (idem acima) > Clicar no mini cart > Verificar que há itens.
- **Justificativa**: Testa a navegação para o carrinho e integridade dos dados do item adicionado.

### 3. Remover produto do carrinho e validar carrinho vazio
- **Fluxo**: Adicionar produto > Abrir carrinho > Remover item > Validar mensagem "carrinho vazio".
- **Justificativa**: Valida lógica de remoção, atualização de UI e estado final do carrinho.

**Por que esses cenários?**: Refletem o ciclo completo de uso de um e-commerce (busca → compra → gerenciamento do carrinho). Cobrem interações comuns de usuários e validam comportamentos críticos da aplicação.

## Próximos passos sugeridos

- Integrar criação de dados via API (se disponível) para testes mais rápidos.
- Adicionar testes de validação de preços, estoques e carrinho persistente (login).
- Integrar execução em CI (GitHub Actions) e report visual (mochawesome).
- Expandir seletores e comandos conforme novos cenários.

## Observações técnicas

Este repositório reutiliza padrões do código Java fornecido:
- `DriverFactory` ↔ `Cypress` (gerenciamento de navegador)
- `BasePage` ↔ `Page Objects em JS` (encapsulamento de lógica)
- `WaitUtils` ↔ `waitForJsAndJQuery()` (waits explícitos)
- `retryClick` ↔ `smartClick` com fallback (robustez)

Os seletores foram adaptados para CSS (preferencialmente) com XPath disponível via `cypress-xpath` para casos complexos.
