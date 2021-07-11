// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Must be declared global to be detected by typescript (allows import/export)
// eslint-disable @typescript/interface-name
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to log a user in. This will automatically set an auth
       * cookie just as if the user has signed in via the UI.
       * @example cy.login()
       */
      login(): Chainable<Response<any>>;
      login({ email, password }: { email: string; password: string }): Chainable<Response<any>>;
    }
  }
}

Cypress.Commands.add("login", ({ email, password } = {}) => {
  const payload = {
    email: email || "hello@seanwash.com",
    password: password || "secretsecret",
  };

  return cy.request({
    url: "/api/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
});

export {};
