import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import sqlite3 from 'better-sqlite3';

const MAX_REGISTERED = 1;

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		// TODO validate with Zod
		const data = Object.fromEntries(
			Array.from(formData.entries()).map(([s, v]) => [s, v.toString()])
		);

		const db = sqlite3('db.sqlite3');
		const result = db.transaction(() => {
			db.prepare('INSERT OR IGNORE INTO user(email) VALUES(?)').run(data['email']);

			const email = data['email'].toString;
			const { registered } = db
				.prepare('SELECT COUNT(*) AS registered FROM registration WHERE user = ?')
				.get(email) as any; // TODO zod validation

			if (registered + 1 > MAX_REGISTERED) {
				return 'limit-exceeded';
			}

			const expiry = new Date();
			expiry.setMonth(expiry.getMonth() + 1);
			const { changes: registrationChanges } = db
				.prepare(
					'INSERT OR IGNORE INTO registration(user,locker,name,expiry) VALUES(?,?,?,datetime(?))'
				)
				.run(data['email'], data['locker'], data['name'], expiry.toISOString());
			if (registrationChanges == 0) {
				return 'locker-taken';
			}
			return 'ok';
		})();
		db.close();

		switch (result) {
			case 'locker-taken':
				// TODO fill in other fields that were fine
				return fail(400, { lockerTaken: true });
			case 'limit-exceeded':
				// TODO send email telling them they can only register one
				console.log('TODO send email telling user they can only register one');
				break;
			case 'ok':
				// TODO send verification email
				console.log('TODO send verification email');
				break;
		}
		const msg = 'Almost done! Check your email for a link to finish registering.';
		throw redirect(302, `/flash?msg=${msg}`);
	}
};
