import { z } from 'zod';
import type { RequestHandler } from './$types';
import { json, text } from '@sveltejs/kit';
import { db } from '$lib/db';

const schema = z.object({
	locker: z.string()
});

export const POST: RequestHandler = async ({ request }) => {
	const parsed = schema.safeParse(await request.json());
	if (!parsed.success) {
		return json({ error: parsed.error.formErrors }, { status: 400 });
	}
	const { locker } = parsed.data;
	db.deleteFrom('registration').where('locker', '=', locker);
	return text('ok');
};
