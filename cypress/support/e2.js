require('cypress-xpath')
require('./commands')
require('@shelex/cypress-allure-plugin')

Cypress.on('uncaught:exception', (err, runnable) => {
  const errorMessage = err.message || err.toString()
  if (
    errorMessage.includes('Script error') ||
    errorMessage.includes('cross-origin') ||
    errorMessage.includes('ResizeObserver') ||
    errorMessage.includes('non-Error') ||
    errorMessage.includes('error.on.request') ||
    errorMessage.includes('chaordicsystems') ||
    errorMessage.includes('Cannot read properties') ||
    errorMessage.includes('Cannot read') ||
    errorMessage.includes('Unexpected token') ||
    errorMessage.includes('Unexpected end') ||
    errorMessage.includes('is not a function') && errorMessage.includes('static') ||
    err.stack && err.stack.includes('static.chaordicsystems') ||
    err.stack && err.stack.includes('loader.js')
  ) {
    cy.log(`⚠️ Erro externo ignorado: ${errorMessage.substring(0, 100)}...`)
    return false // Não falhar o teste
  }
  cy.log(`❌ Erro detectado: ${errorMessage.substring(0, 150)}`)
  return true
})
