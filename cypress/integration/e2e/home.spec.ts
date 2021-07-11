describe("Home", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders the home page", () => {
    cy.get("[data-cy=homePage]").should("be.visible");
  });
});

export {};
