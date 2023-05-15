import { base } from '$app/paths';
import { login } from '$lib/auth.server';
import { defaultExpiry } from '$lib/date';
import { db } from '$lib/db';
import { parseMagicToken } from '$lib/magic';
import { json, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, cookies, fetch }) => {
	if (!params.token) {
		return json({ message: 'Missing token' }, { status: 400 });
	}
	const data = parseMagicToken(params.token);
	if (data.type === 'register') {
		const { user, locker, name } = data;
		await db
			.insertInto('registration')
			.ignore()
			.values({
				user,
				name,
				locker,
				expiry: defaultExpiry()
			})
			.executeTakeFirstOrThrow();
		login(data, cookies);
		throw redirect(302, `${base}/lockers`);
	} else if (data.type === 'login') {
		login(data, cookies);
		throw redirect(302, `${base}/lockers`);
	} else if (data.type === 'transfer') {
		const { user, locker } = data;
		await db.insertInto('user').ignore().values({ email: user }).execute();
		await db
			.updateTable('registration')
			.set({ user })
			.where('locker', '=', locker)
			.executeTakeFirstOrThrow();
		throw redirect(302, `${base}/lockers/${encodeURIComponent(locker)}`);
	}
	return {};
};