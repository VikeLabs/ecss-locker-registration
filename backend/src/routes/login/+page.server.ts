import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import sqlite3 from 'better-sqlite3';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString() ?? '';

		const db = sqlite3('db.sqlite3');
		const emailExists = db.transaction(() => {
			const result = db.prepare('SELECT COUNT(*) FROM user WHERE email = ?').get(email) as any;
			console.log(result);

			return result['COUNT(*)'] !== 0;
		})();
		db.close();

		if (emailExists) {
			// TODO actually send email
		}

		cookies.set('user', email, { path: '/' });

		// we send success result anyways to prevent email enumeration
		throw redirect(302, 'lockers');
	}
};
