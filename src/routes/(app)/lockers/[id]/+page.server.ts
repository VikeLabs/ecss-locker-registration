import { redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import sqlite3 from 'better-sqlite3';
import { mustAuthorize } from '$lib/auth.server';
import { db } from '$lib/db';
import { defaultExpiry } from '$lib/date';
import { sql } from 'kysely';

export type LockerStatus = 'expired' | 'available' | 'claimed';
export type Locker = {
	name: string;
	locker: string;
	status: LockerStatus;
};

export const load: PageServerLoad<Locker> = ({ params, cookies }) => {
	const { user } = mustAuthorize(cookies);

	const locker = params.id;

	const db = sqlite3('db.sqlite3');
	const result = db
		.prepare('SELECT name, expiry FROM registration WHERE user = ? AND locker = ? AND active')
		.get(user, locker) as any; // TODO zod
	if (result === undefined) {
		throw error(404, { message: "you haven't registered this locker" });
	}
	const { name, expiry } = result;
	let status: LockerStatus = 'claimed';
	const expiresOn = Date.parse(expiry);
	const now = Date.now();
	if (expiresOn < now) {
		status = 'expired';
	}

	return { name, locker, status };
};

export const actions: Actions = {
	renew: async ({ params, cookies }) => {
		const { user } = mustAuthorize(cookies);
		const locker = params.id;
		db.updateTable('registration')
			.set({ expiry: sql`datetime(${defaultExpiry().toISOString()})` })
			.where('user', '=', user) // SECURITY
			.where('locker', '=', locker)
			.execute();
		throw redirect(302, `./${locker}`);
	}
};
