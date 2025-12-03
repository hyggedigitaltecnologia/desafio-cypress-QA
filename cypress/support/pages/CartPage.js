class CartPage {
  constructor() {
    this.miniCartLink =
      "a.mini-cart__link[title='Mini Cart'], a.mini-cart__link[href*='/cart']"

    this.productItems =
      "div.product-item, [data-testid='product-item'], [data-testid='basket-item']"

    this.removeItemButton =
      "i.remove-icon[qa-auto='product-btn-remove'], i[qa-auto='product-btn-remove'].remove-icon"

    this.emptyCartTitle =
      "h1[class*='empty-page__title'], h1:contains('Seu carrinho está vazio')"
  }

  openFromMiniCart() {
    cy.smartClick(this.miniCartLink)
    cy.waitForJsAndJQuery()

    cy.get('body').then(($body) => {
      if ($body.find(this.productItems).length === 0) {
        cy.log('Carrinho vazio. Aguardando título de carrinho vazio.')
      }
    })
  }

  isAnyItemInCart() {
    return cy.get('body').then(($body) => {
      const items = $body.find(this.productItems)
      return items.length > 0
    })
  }

  removeFirstItem() {
    cy.smartClick(this.removeItemButton)
    cy.waitForJsAndJQuery()
  }

  isCartEmpty() {
    return cy.get('body').then(($body) => {
      const hasEmptyTitle = $body.find(this.emptyCartTitle).length > 0
      const hasItems = $body.find(this.productItems).length > 0
      return hasEmptyTitle || !hasItems
    })
  }
}

module.exports = CartPage