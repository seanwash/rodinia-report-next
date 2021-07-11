describe("Signup", () => {
  beforeEach(() => {
    cy.visit("/signup");
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
      cy.login();
      cy.visit("/signup");
      cy.location("pathname").should("eq", "/");
    });
  });
});

export {};
