-- CreateTable
CREATE TABLE "ReactionOption" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoryReaction" (
    "id" SERIAL NOT NULL,
    "reactionOptionId" INTEGER NOT NULL,
    "storyId" INTEGER,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ReactionOption.name_unique" ON "ReactionOption"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ReactionOption.code_unique" ON "ReactionOption"("code");

-- CreateIndex
CREATE UNIQUE INDEX "StoryReaction.reactionOptionId_storyId_userId_unique" ON "StoryReaction"("reactionOptionId", "storyId", "userId");

-- AddForeignKey
ALTER TABLE "StoryReaction" ADD FOREIGN KEY ("reactionOptionId") REFERENCES "ReactionOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoryReaction" ADD FOREIGN KEY ("storyId") REFERENCES "Story"("id") ON DELETE SET NULL ON UPDATE CASCADE;
