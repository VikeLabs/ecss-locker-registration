import { base } from '$app/paths';
import { env } from '$env/dynamic/private';
import { loginCookie } from '$lib/auth.server';
import { defaultExpiry } from '$lib/date';
import { db } from '$lib/db';
import { parseMagicToken } from '$lib/magic';
import { json, type RequestHandler } from '@sveltejs/kit';
import { sql } from 'kysely';

const urlPrefix = `${env.URL_PREFIX ?? ''}${base}`;

function loginResponse(user: string) {
	return new Response('', {
		status: 302,
		headers: {
			location: `${urlPrefix}/lockers`,
			'set-cookie': loginCookie({ user })
		}
	});
}

export const GET: RequestHandler = async ({ params, cookies }) => {
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
		return loginResponse(user);
	} else if (data.type === 'login') {
		return loginResponse(data.user);
	} else if (data.type === 'transfer') {
		const { user, locker } = data;
		await db
			.updateTable('registration')
			.set({ user })
			.where('locker', '=', locker)
			.executeTakeFirstOrThrow();
		return Response.redirect(`${urlPrefix}/lockers/${encodeURIComponent(locker)}`);
	}

	return new Response('unreachable', { status: 500 });
};
