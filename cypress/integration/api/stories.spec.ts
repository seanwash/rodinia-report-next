describe("/api/stories", () => {
  it("should return a list of stories", () => {
    cy.task("db:story:create", {
      sourceTitle: "Story without topic",
      sourceUrl: "https://www.storywithouttopic.com",
      sourcePaywalled: false,
      userId: "123",
    });

    cy.request({
      url: "/api/stories",
      method: "GET",
    })
      .its("body")
      .should("have.a.property", "stories")
      .should("be.an", "array");
  });

  describe("with a topic parameter", () => {
    it("should return only stories belonging to the given topic", () => {
      cy.task("db:story:create", {
        sourceTitle: "Story without topic",
        sourceUrl: "https://www.storywithouttopic.com",
        sourcePaywalled: false,
        userId: "123",
      });

      cy.task("db:story:create", {
        sourceTitle: "Story without matching topic",
        sourceUrl: "https://www.storywithoutmatchingtopic.com",
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

      cy.task("db:story:create", {
        sourceTitle: "Story with matching topic",
        sourceUrl: "https://www.storywithmachingtopic.com",
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

      cy.request({
        url: "/api/stories",
        method: "GET",
        qs: {
          topic: "energy",
        },
      })
        .its("body.stories")
        .then((stories) => stories.map((story) => story.sourceTitle))
        .should("not.include", "Story without matching topic")
        .should("not.include", "Story without topic")
        .should("include", "Story with matching topic");
    });
  });
});
