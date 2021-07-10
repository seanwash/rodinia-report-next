describe('/api/stories', () => {
  it("should return a list of stories", () => {
    cy.request({
      url: "/api/stories",
      method: 'GET'
    })
      .its('body')
      .should('have.a.property', 'stories[*]')
  });
})
