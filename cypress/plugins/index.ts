/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.ts can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

import { db } from "../../lib/db";

require("dotenv-flow").config();

// eslint-disable-next-line import/no-anonymous-default-export
export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on("task", {
    "db:reset": async () => {
      for (const { tablename } of await db.$queryRaw`SELECT tablename
                                                     FROM pg_tables
                                                     WHERE schemaname = 'public'`) {
        if (tablename !== "_prisma_migrations") {
          try {
            await db.$queryRaw(`TRUNCATE TABLE "public"."${tablename}" CASCADE;`);
          } catch (error) {
            console.log({ error });
          }
        }
      }

      return true;
    },

    "db:seed": () => true,

    "db:story:create": async (data) => {
      return db.story.create({ data });
    },

    "db:topic:create": async (data) => {
      return db.topic.create({ data });
    },
  });

  return config;
};
