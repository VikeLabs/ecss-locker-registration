import type { RequestHandler } from './$types';
import { z } from 'zod';
import { db } from '$lib/db';
import { ValuesNode, sql } from 'kysely';
import { json, text } from '@sveltejs/kit';

const schema = z.object({
	locker: z.string(),
	user: z.string().email(),
	name: z.string(),
	expiry: z.string().optional()
});

export const POST: RequestHandler = async ({ request }) => {
	const parsed = schema.safeParse(await request.json());
	if (!parsed.success) {
		return json({ error: parsed.error.formErrors }, { status: 400 });
	}
	const { user, name, expiry, locker } = parsed.data;
	const success = await db.transaction().execute(async (trx) => {
		// await trx
		// 	.insertInto('user')
		// 	.onConflict((c) => c.doNothing())
		// 	.values({ email: user })
		// 	.execute();

		// const sqlExpiry = sql`datetime()`;
		// let values = { ...parsed.data, expiry: sqlExpiry };
		// const result = await trx.insertInto('registration').values().executeTakeFirst();
		// return result.numInsertedOrUpdatedRows === 1n;
		return false
	});
	if (success) {
		return json({ error: 'Failed to register' });
	}
	return text('ok', { status: 200 });
};
