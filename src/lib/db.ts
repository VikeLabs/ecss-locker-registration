import { env } from "$env/dynamic/private";
import { Kysely } from "kysely";
import type { DB } from "kysely-codegen/dist/db.d.ts";
import { PlanetScaleDialect } from "kysely-planetscale";

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    url: env.DATABASE_URL,
  }),
});
