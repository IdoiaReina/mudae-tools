describe('Login', () => {
  it('should log user', () => {
    cy.login()
    cy.url().should('contain', '/cra')
  })
})

export {}
