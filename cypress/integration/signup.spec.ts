describe("Signup", () => {
  beforeEach(() => {
    cy.visit('/signup');
  });

  it("contains a sign in form", () => {
    cy.get("[data-cy=signupForm]").should("be.visible");
  });

  it("doesn't allow an empty form to be submitted", () => {
    cy.get("button[type=submit]").click();
    cy.get("input:invalid").should("have.length", 2);
  });

  describe("when a user is already signed in", () => {
    it("redirects the user back to the homepage", () => {
      // TODO: We should setup an API call that logs the user in instead of
      // walking through the UI.
      cy.visit(Cypress.env("baseUrl") + "/login");
      cy.get("input[type=email]").type("hello@seanwash.com");
      cy.get("input[type=password]").type("secretsecret");
      cy.get("button[type=submit]").click();
      cy.location("pathname").should("eq", "/");
      cy.visit('/signup');
      cy.location("pathname").should("eq", "/");
    });
  });
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
