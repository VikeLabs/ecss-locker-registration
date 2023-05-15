import { Kysely } from "kysely";
import { PlanetScaleDialect } from "kysely-planetscale";

export const db = new Kysely({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});

function range(start, end) {
  return [...Array(1 + end - start).keys()].map((n) => start + n);
}

const lockers = [range(1, 200)]
  .flat()
  .map((x) => `ELW ${x.toString().padStart(3, "0")}`);

console.log(
  (
    await db
      .insertInto("locker")
      .ignore()
      .values(
        lockers.map((x) => ({
          id: x,
        }))
      )
      .executeTakeFirstOrThrow()
  ).numInsertedOrUpdatedRows
);
