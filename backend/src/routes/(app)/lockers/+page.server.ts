import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import sqlite3 from 'better-sqlite3';

export const load: PageServerLoad = ({ cookies }) => {
	const user = cookies.get('user');
	if (user === undefined) {
		throw error(403);
	}

	const db = sqlite3('db.sqlite3');
	const result = db
		.prepare('SELECT name, locker FROM registration WHERE user = ? AND active')
		.iterate(user) as any;
	const lockers = [...result];
	return { locker: lockers };
};
