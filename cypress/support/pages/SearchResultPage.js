class SearchResultPage {
  constructor() {
    this.firstProductLink = "(//span[contains(@class,'card__description--name')])[1]/ancestor::a[1]"
  }

  openFirstProduct() {
    cy.xpath(this.firstProductLink).click()
    cy.waitForJsAndJQuery()
  }
}

module.exports = SearchResultPage