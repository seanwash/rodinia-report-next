const { PrismaClient } = require("@prisma/client");
const db = new PrismaClient();

async function seed() {
  // Topics --------------------------------------------
  try {
    await db.topic.createMany({
      data: [
        {
          name: "Energy",
          slug: "energy",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Oceans",
          slug: "oceans",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Biodiversity",
          slug: "biodiversity",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Food & Agriculture",
          slug: "food-agriculture",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Climate",
          slug: "climate",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Policy",
          slug: "policy",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Water",
          slug: "water",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    });
  } catch (e) {
    console.log("--------", "Failed to create Topics:", e);
  }

  // ReactionOptions -----------------------------------
  try {
    await db.reactionOption.createMany({
      data: [
        {
          name: "clapping",
          code: "👏",
        },
        {
          name: "thumbs_up",
          code: "👍",
        },
        {
          name: "thumbs_down",
          code: "👎",
        },
        {
          name: "thinking",
          code: "🤔",
        },
        {
          name: "mind_exploding",
          code: "🤯",
        },
        {
          name: "fire",
          code: "🔥",
        },
      ],
    });
  } catch (e) {
    console.log("--------", "Failed to create ReactionOptions:", e);
  }

  // Stories -------------------------------------------
  try {
    await db.story.create({
      data: {
        sourceTitle: "'Powerful signal': In a single day, Big Oil suffers historic blows on climate",
        sourceUrl: "https://www.politico.com/news/2021/05/26/big-oil-exxon-climate-491104?edf=860",
        sourcePaywalled: false,
        userId: "123", // How to grab this from FB?,
        topics: {
          connect: [{ id: 1 }, { id: 2 }],
        },
      },
    });

    await db.story.create({
      data: {
        sourceTitle: "Shell ordered to cut CO2 emissions by 45% in landmark climate case",
        sourceUrl:
          "https://www.euronews.com/green/2021/05/26/shell-ordered-to-cut-co2-emissions-by-45-in-landmark-climate-case",
        sourcePaywalled: false,
        userId: "123", // How to grab this from FB?
        topics: {
          connect: [{ id: 3 }, { id: 4 }],
        },
      },
    });
  } catch (e) {
    console.log("--------", "Failed to create Stories:", e);
  }
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
