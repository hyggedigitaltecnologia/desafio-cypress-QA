class HomePage {
  constructor() {
    this.searchInput = "input[type='search'], input[name='search'], input[placeholder*='Pesquisar'], input[placeholder*='pesquisar']"
    this.searchForm = "form[role='search'], form[class*='search'], .search-input-wrapper"
  }

  open() {
    cy.visit('/')
    cy.waitForJsAndJQuery()
  }

  search(term) {
    cy.get(this.searchInput).first().then(($input) => {
      cy.wrap($input).scrollIntoView({ block: 'center', inline: 'center' })
      cy.wrap($input).clear().type(term, { delay: 100 })

      cy.wrap($input).type('{enter}')
    })

    cy.waitForJsAndJQuery()
  }
}

module.exports = HomePage