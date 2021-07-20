describe("/api/topics", () => {
  it("should return a list of topics", () => {
    cy.task("db:topic:create", {
      name: "Energy",
      slug: "energy",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    cy.request({
      url: "/api/topics",
      method: "GET",
    })
      .its("body")
      .should("have.a.property", "topics")
      .should("be.an", "array");
  });
});

describe("/api/topics/{slug}", () => {
  it("should return a topic matching the given slug", () => {
    cy.task("db:topic:create", {
      name: "Energy",
      slug: "energy",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    cy.task("db:topic:create", {
      name: "Oceans",
      slug: "oceans",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    cy.request({
      url: "/api/topics/energy",
      method: "GET",
    })
      .its("body")
      .should("have.a.property", "topic")
      .should("be.an", "object")
      .should("have.a.property", "slug", "energy");
  });
});
