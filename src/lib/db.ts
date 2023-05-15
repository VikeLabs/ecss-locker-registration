import { Kysely } from 'kysely';
import type { DB } from 'kysely-codegen/dist/db.d.ts';
import { DATABASE_URL } from '$env/static/private';
import { PlanetScaleDialect } from 'kysely-planetscale';

export const db = new Kysely<DB>({
	dialect: new PlanetScaleDialect({
		url: DATABASE_URL
	})
});
