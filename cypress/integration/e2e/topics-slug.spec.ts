describe("Topics Slug", () => {
  beforeEach(() => {
    cy.task("db:story:create", {
      sourceTitle: "Story about energy",
      sourceUrl: "https://www.storyaboutenergy.com",
      sourcePaywalled: false,
      userId: "123",
      topics: {
        create: [
          {
            name: "Energy",
            slug: "energy",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    });

    cy.task("db:story:create", {
      sourceTitle: "Story about oceans",
      sourceUrl: "https://www.storyaboutoceans.com",
      sourcePaywalled: false,
      userId: "123",
      topics: {
        create: [
          {
            name: "Oceans",
            slug: "oceans",
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
      },
    });
  });

  it("should render a topic's slug page", () => {
    cy.visit("/topics/oceans");
    cy.get("[data-cy=topicSlugPage]").should("be.visible");
  });

  it("should include the current topic in document.title", function () {
    cy.visit("/topics/oceans");
    cy.title().should("contain", "Oceans");
    cy.visit("/topics/energy");
    cy.title().should("contain", "Energy");
  });

  it("should mention the current topic", function () {
    cy.visit("/topics/oceans");
    cy.contains("Stories on Oceans");
  });

  it("should only include stories that belong to the topic", function () {
    cy.visit("/topics/oceans");
    cy.get("[data-cy=storyListItem]").should("have.length", 1);

    cy.visit("/topics/energy");
    cy.get("[data-cy=storyListItem]").should("have.length", 1);
  });
});

export {};
