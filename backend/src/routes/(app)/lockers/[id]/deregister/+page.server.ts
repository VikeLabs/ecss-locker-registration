import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { logout, mustAuthorize } from '$lib/auth.server';
import { db } from '$lib/db';
import { s } from 'vitest/dist/index-5aad25c1';
import { base } from '$app/paths';

export const actions: Actions = {
	default: async ({ params, cookies }) => {
		const { user } = mustAuthorize(cookies);
		// don't tell the user if this fails, only happens if people mess with the API and they dont deserve errors
		const hasLockers = await db.transaction().execute(async (trx) => {
			await trx
				.deleteFrom('registration')
				.where('user', '=', user)
				.where('locker', '=', params.id)
				.execute();

			const { count } = await trx
				.selectFrom('registration')
				.select([db.fn.countAll<number>().as('count')])
				.where('user', '=', user)
				.executeTakeFirstOrThrow();
			return count > 0;
		});
		if (!hasLockers) {
			// go get a new one
			logout(cookies);
			throw redirect(302, `${base}/register`);
		}
		throw redirect(302, '..');
	}
};
