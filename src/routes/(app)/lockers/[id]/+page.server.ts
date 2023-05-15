import { redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { mustAuthorize } from '$lib/auth.server';
import { db } from '$lib/db';
import { defaultExpiry } from '$lib/date';

export type LockerStatus = 'expired' | 'available' | 'claimed';
export type Locker = {
	name: string;
	locker: string;
	status: LockerStatus;
};

export const load: PageServerLoad<Locker> = async ({ params, cookies }) => {
	const { user } = await mustAuthorize(cookies);
	const locker = params.id;

	const result = await db
		.selectFrom('registration')
		.select(['name', 'expiry'])
		.where('user', '=', user)
		.where('locker', '=', locker)
		.executeTakeFirst();
	if (result === undefined) {
		throw error(404, { message: "you haven't registered this locker" });
	}
	const { name, expiry } = result;

	let status: LockerStatus = 'claimed';
	const now = Date.now();
	if (expiry.valueOf() < now) {
		status = 'expired';
	}

	return { name, locker, status };
};

export const actions: Actions = {
	renew: async ({ params, cookies }) => {
		const { user } = await mustAuthorize(cookies);
		const locker = params.id;
		db.updateTable('registration')
			.set({ expiry: defaultExpiry() })
			.where('user', '=', user) // SECURITY
			.where('locker', '=', locker)
			.execute();
		throw redirect(302, `./${locker}`);
	}
};
