import { Kysely } from "kysely";
import type { DB } from "kysely-codegen/dist/db.d.ts";
import { env } from "$env/dynamic/private";
import { PlanetScaleDialect } from "kysely-planetscale";

if (!env.DATABASE_URL) {
  throw Error("DATABASE_URL undefined");
}

export const db = new Kysely<DB>({
  dialect: new PlanetScaleDialect({
    url: env.DATABASE_URL,
  }),
});
