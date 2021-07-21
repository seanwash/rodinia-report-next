import { Story } from "../../../lib/db";

describe("StoryPermalinkPage", () => {
  it("should redirect to a matching story's sourceUrl", () => {
    cy.task("db:story:create", {
      sourceTitle: "Story about energy",
      sourceUrl: "https://example.com",
      sourcePaywalled: false,
      userId: "123",
    }).then((story: Story) => {
      cy.visit(`/s/${story.id}`);
      // NOTE: Potential source of flake here, just asserting cy.url === story.sourceUrl doesn't seem to work.
      cy.location().then((location: Location) => {
        expect(location.hostname).to.include(new URL(story.sourceUrl).hostname);
        expect(location.search).to.include("rodinia_report");
      });
    });
  });

  describe("when given an invalid story id", () => {
    it("should respond with a 404 page", () => {
      cy.visit(`/s`, { failOnStatusCode: false }).contains("404");
      cy.visit(`/s/100000`, { failOnStatusCode: false }).contains("404");
    });
  });
});
