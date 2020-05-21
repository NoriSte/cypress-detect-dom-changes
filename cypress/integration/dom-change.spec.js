/// <reference types="Cypress" />

context('Cypress Wait Until', () => {
  let mutationsHistory
  beforeEach(() => {
    cy.visit('/')

    mutationsHistory = []
    cy.get('#some-id').then(($targetNode) => {
      const observer = new MutationObserver((mutationsList) => mutationsHistory.push(mutationsList))
      observer.observe($targetNode[0], { childList: true })
    })
  })

  it('Should detect the DOM change', () => {
    cy.contains('Mutate after a random delay').click()
    cy.wrap(mutationsHistory)
      .should('have.length.greaterThan', 0)
      .then((mutationsHistory) => {
        cy.log('Now you can do whatever you want with `mutationsHistory`')
        console.log(mutationsHistory)
      })
  })

  it('Should detect the DOM change with cy.waitUntil', () => {
    cy.contains('Mutate after a random delay').click()
    cy.waitUntil(() => (mutationsHistory.length ? mutationsHistory : false)).then(
      (mutationsHistory) => {
        cy.log('Now you can do whatever you want with `mutationsHistory`')
        console.log(mutationsHistory)
      }
    )
  })
})
