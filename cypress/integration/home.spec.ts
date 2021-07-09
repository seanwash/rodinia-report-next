const DESTINATION = Cypress.env("baseUrl");

describe("Home", () => {
  beforeEach(() => {
    cy.visit(DESTINATION);
  });

  it("renders the home page", () => {
    cy.get("[data-cy=homePage]").should("be.visible");
  });
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
