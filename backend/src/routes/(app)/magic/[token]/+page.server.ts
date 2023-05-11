import { base } from '$app/paths';
import { login } from '$lib/auth.server';
import { defaultExpiry } from '$lib/date';
import { db } from '$lib/db';
import { parseMagicToken } from '$lib/magic';
import { json, redirect } from '@sveltejs/kit';
import { sql } from 'kysely';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies }) => {
	if (!params.token) {
		return json({ message: 'Missing token' }, { status: 400 });
	}
	const data = parseMagicToken(params.token);
	if (data.type === 'register') {
		const { user, locker, name } = data;
		await db
			.insertInto('registration')
			.onConflict((c) => c.doNothing())
			.values({
				user,
				name,
				locker,
				expiry: sql`datetime(${defaultExpiry().toISOString()})`
			})
			.executeTakeFirstOrThrow();
		login(data, cookies);
		throw redirect(302, `${base}/lockers`);
	} else if (data.type === 'login') {
		login(data, cookies);
		throw redirect(302, `${base}/lockers`);
	} else if (data.type === 'transfer') {
		const { user, locker } = data;
		await db
			.insertInto('user')
			.onConflict((c) => c.doNothing())
			.values({ email: user })
			.execute();
		await db
			.updateTable('registration')
			.set({ user })
			.where('locker', '=', locker)
			.executeTakeFirstOrThrow();
		throw redirect(302, `${base}/lockers/${encodeURIComponent(locker)}`);
	}
	return {};
};
