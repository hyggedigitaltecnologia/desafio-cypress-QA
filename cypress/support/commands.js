Cypress.Commands.add('waitForJsAndJQuery', (timeout = 5000) => {
  cy.window().then((win) => {
    const isComplete = () => {
      const docReady = win.document.readyState === 'complete'
      const jQueryReady = typeof win.jQuery === 'undefined' || win.jQuery.active === 0
      return docReady && jQueryReady
    }

    if (!isComplete()) {
      cy.window({ timeout }).should(() => {
        expect(isComplete()).to.be.true
      })
    }
  })
})

Cypress.Commands.add('smartClick', (selector) => {
  cy.get(selector).then(($el) => {
    cy.wrap($el).scrollIntoView({ block: 'center', inline: 'center' })
    cy.wrap($el).click({ force: true })
  })
})

Cypress.Commands.add('smartType', (selector, text) => {
  cy.get(selector).then(($el) => {
    cy.wrap($el).scrollIntoView({ block: 'center', inline: 'center' })
    cy.wrap($el).clear().type(text)
  })
})
