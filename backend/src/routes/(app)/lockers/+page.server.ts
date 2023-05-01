import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import sqlite3 from 'better-sqlite3';
import { logout, mustAuthorize } from '$lib/auth.server';

export const load: PageServerLoad = ({ cookies }) => {
	const { user } = mustAuthorize(cookies);

	const db = sqlite3('db.sqlite3');
	const result = db
		.prepare('SELECT name, locker FROM registration WHERE user = ? AND active')
		.iterate(user) as any;
	const lockers = [...result];
	return { locker: lockers };
};

export const actions: Actions = {
	logout: ({ cookies }) => {
		logout(cookies);
		throw redirect(302, '../login');
	}
};
