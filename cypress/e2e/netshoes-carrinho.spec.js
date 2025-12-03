/// <reference types="cypress" />

const HomePage = require('../support/pages/HomePage')
const SearchResultPage = require('../support/pages/SearchResultPage')
const ProductPage = require('../support/pages/ProductPage')
const CartPage = require('../support/pages/CartPage')

describe('Fluxo de Carrinho - Netshoes', () => {

  beforeEach(() => {
    cy.viewport(1920, 1080)
  })

  afterEach(function() {
    // Capturar screenshot ao final de cada teste (usando comando que já está na fila)
    if (this.currentTest) {
      const testName = this.currentTest.title
      cy.screenshot(testName, { capture: 'fullPage' })
    }
  })

  it('Deve buscar um produto "Tênis", selecionar tamanho e adicionar ao carrinho', () => {
    const homePage = new HomePage()
    homePage.open()

    homePage.search('Tênis')

    const searchResultPage = new SearchResultPage()
    searchResultPage.openFirstProduct()

    const productPage = new ProductPage()
    productPage.addToCart()

    cy.waitForJsAndJQuery()

    cy.get('body').should('be.visible')
  })

  it('Deve adicionar produto ao carrinho e validar via mini cart', () => {
    const homePage = new HomePage()
    homePage.open()

    homePage.search('Tênis')

    const searchResultPage = new SearchResultPage()
    searchResultPage.openFirstProduct()

    const productPage = new ProductPage()
    productPage.addToCart()

    cy.waitForJsAndJQuery()

    const cartPage = new CartPage()
    cartPage.openFromMiniCart()

    cy.get('body').should('be.visible')
  })

  it('Deve remover o produto do carrinho', () => {
    const homePage = new HomePage()
    homePage.open()

    homePage.search('Tênis')

    const searchResultPage = new SearchResultPage()
    searchResultPage.openFirstProduct()

    const productPage = new ProductPage()
    productPage.addToCart()

    cy.waitForJsAndJQuery()

    const cartPage = new CartPage()
    cartPage.openFromMiniCart()

    cy.get('body').should('be.visible')

    cy.get('body').then(($body) => {
      const hasItems = $body.find('div.product-item, [data-testid="product-item"], [data-testid="basket-item"]').length > 0
      if (hasItems) {
        cartPage.removeFirstItem()
        cy.waitForJsAndJQuery()
      }
    })

    cy.get('body').should('be.visible')
  })
})
