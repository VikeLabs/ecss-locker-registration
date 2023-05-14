import { db } from '$lib/db';
import { sql } from 'kysely';
import type { RequestHandler } from './$types';
import { defaultExpiry } from '$lib/date';
import { z } from 'zod';

const schema = z.object({
	locker: z.string()
});

export const POST: RequestHandler = async ({ request }) => {
	const parsed = schema.safeParse(await request.json());
	if (!parsed.success) {
		return new Response('Missing locker', { status: 400 });
	}
	const { locker } = parsed.data;
	await db
		.updateTable('registration')
		.where('locker', '=', locker)
		.set({ expiry: sql`datetime(${defaultExpiry().toISOString()})` })
		.executeTakeFirstOrThrow();
	return new Response();
};
