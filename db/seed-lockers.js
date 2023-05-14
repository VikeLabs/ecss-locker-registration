import { Kysely, SqliteDialect } from 'kysely';
import sqlite3 from 'better-sqlite3';

export const trx = new Kysely({
	dialect: new SqliteDialect({
		database: async () => sqlite3('db.sqlite3')
	})
});

function range(start, end) {
	return [...Array(1 + end - start).keys()].map((n) => start + n);
}

const lockers = [range(1, 200)].flat().map((x) => x.toString());

console.log(
	await trx.transaction().execute(async (trx) => {
		const insertLocker = trx.insertInto('locker').onConflict((c) => c.doNothing());
		const deleteLocker = trx.deleteFrom('locker');
		for (const n in lockers) {
			if (+n < 100) {
				await deleteLocker.where('id', '=', n).execute();
			}
			await insertLocker.values({ id: n.padStart(3, '0') }).execute();
		}
	})
);
