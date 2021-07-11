import { PrismaClient, Prisma } from "@prisma/client";

const isDevelopment = process.env.NODE_ENV === "development";

const storyWithTopics = Prisma.validator<Prisma.StoryArgs>()({
  include: {
    topics: true,
  },
});
export type StoryWithTopics = Prisma.StoryGetPayload<typeof storyWithTopics>;

const storyWithReactions = Prisma.validator<Prisma.StoryArgs>()({
  include: {
    reactions: {
      include: {
        reactionOption: true,
      },
    },
  },
});
export type StoryWithReactions = Prisma.StoryGetPayload<
  typeof storyWithReactions
>;

export type StoryWithListEntities = StoryWithTopics & StoryWithReactions;

// https://github.com/prisma/prisma/issues/5007
let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient({
      log: isDevelopment
        ? ["query", "info", "warn", "error"]
        : ["warn", "error"],
    });
  }
  // @ts-ignore
  prisma = global.prisma;
}

export const db = prisma;
export * from "@prisma/client";
