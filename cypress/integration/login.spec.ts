function signIn() {
  cy.get("input[type=email]").type("hello@seanwash.com");
  cy.get("input[type=password]").type("secretsecret");
  cy.get("button[type=submit]").click();
}

describe("Login", () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it("contains a sign in form", () => {
    cy.get("[data-cy=loginForm]").should("be.visible");
  });

  it("doesn't allow an empty form to be submitted", () => {
    cy.get("button[type=submit]").click();
    cy.get("input:invalid").should("have.length", 2);
  });

  it("redirects a logged in user back to the homepage", () => {
    signIn();
    cy.location("pathname").should("eq", "/");
    cy.getCookie("TheRodiniaReport").should("exist");
  });

  describe("when a user is already signed in", () => {
    it("redirects the user back to the homepage", () => {
      // TODO: We should setup an API call that logs the user in instead of
      // walking through the UI.
      signIn();
      cy.location("pathname").should("eq", "/");
      cy.visit('/login');
      cy.location("pathname").should("eq", "/");
    });
  });
});

// eslint-disable-next-line import/no-anonymous-default-export
export default {};
