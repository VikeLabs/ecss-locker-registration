import { redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import sqlite3 from 'better-sqlite3';

export type LockerStatus = 'expired' | 'available' | 'claimed';
export type Locker = {
	name: string;
	locker: string;
	status: LockerStatus;
};

const lockers: {
	[key: string]: {
		name: string;
		status: LockerStatus;
	};
} = {
	'120': {
		name: 'Malcolm Seyd',
		status: 'expired'
	},
	'144': {
		name: 'VikeSec',
		status: 'claimed'
	}
};

export const load: PageServerLoad<Locker> = ({ params, cookies }) => {
	const user = cookies.get('user');
	if (user === undefined) {
		throw error(403);
	}

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
	renew: async ({ params }) => {
		// TODO: renew locker
		console.log(`TODO: renew locker ${params.id}`);
		await new Promise((r) => setTimeout(r, 1000));
		throw redirect(302, `./${params.id}`);
	}
};
