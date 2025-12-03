class ProductPage {
  constructor() {
    this.buyButton = "button"
    this.sizeListContainer = "ul"
    this.availableSizes = "button"
  }

  selectFirstAvailableSizeIfNeeded() {
    cy.get('body').then(($body) => {
      if ($body.text().toLowerCase().includes('tamanho') || 
          $body.text().toLowerCase().includes('size')) {
        cy.log('Produto possui grade de tamanhos. Buscando para seleção.')
        cy.get('button').then(($buttons) => {
          for (let btn of $buttons) {
            const text = btn.textContent.toLowerCase()
            if (/^(p|m|g|gg|pp|\d+)$/.test(text.trim())) {
              cy.wrap(btn).scrollIntoView()
              cy.wrap(btn).click({ force: true })
              cy.waitForJsAndJQuery()
              break
            }
          }
        })
      }
    })
  }

  addToCart() {
    this.selectFirstAvailableSizeIfNeeded()
    // Procurar botão de compra por texto
    cy.get('button').each(($btn, idx) => {
      const text = $btn.text().toLowerCase()
      if (text.includes('comprar') || text.includes('add to cart') || 
          text.includes('add') && text.includes('cart')) {
        cy.wrap($btn).scrollIntoView()
        cy.wrap($btn).click({ force: true })
        cy.waitForJsAndJQuery()
        // Break early
        return false
      }
    })
    cy.waitForJsAndJQuery()
  }
}

module.exports = ProductPage