import { Kysely, SqliteDialect } from 'kysely';
import sqlite3 from 'better-sqlite3';
import type { DB } from 'kysely-codegen/dist/db.d.ts';
import { env } from '$env/dynamic/private';

const { DATABASE_URL } = env;
if (DATABASE_URL === undefined) {
	throw new Error('DATABASE_URL is undefined');
}

export const db = new Kysely<DB>({
	dialect: new SqliteDialect({
		database: async () => sqlite3(DATABASE_URL)
	})
});
