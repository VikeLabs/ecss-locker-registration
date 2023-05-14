import type { RequestHandler } from './$types';
import { z } from 'zod';
import { db } from '$lib/db';
import { sql } from 'kysely';
import { json, text } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const parsed = schema.safeParse(await request.json());
	if (!parsed.success) {
		return json({ error: parsed.error.formErrors }, { status: 400 });
	}
	const { user, name, expiry, locker } = parsed.data;
	const success = await db.transaction().execute(async (trx) => {
		await trx
			.insertInto('user')
			.onConflict((c) => c.doNothing())
			.values({ email: user })
			.execute();
		const result = await trx
			.insertInto('registration')
			.onConflict((c) => c.doUpdateSet({ user, name, expiry: sql`datetime(${expiry})` }))
			.values({ user, name, locker, expiry: sql`datetime(${expiry})` })
			.executeTakeFirst();
		return result.numInsertedOrUpdatedRows === 1n;
	});
	if (success) {
		return json({ error: 'This locker is not available right now' });
	}
	return text('ok', { status: 200 });
};
