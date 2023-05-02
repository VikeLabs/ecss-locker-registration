import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import sqlite3 from 'better-sqlite3';
import { z } from 'zod';
import { setError, setMessage, superValidate } from 'sveltekit-superforms/server';

const MAX_REGISTERED = 1;

const formSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	locker: z.string()
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(formSchema);
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, formSchema);
		if (!form.valid) {
			return fail(400, { form });
		}
		const { email, locker, name } = form.data;

		const db = sqlite3('db.sqlite3');
		const result = db.transaction(() => {
			db.prepare('INSERT OR IGNORE INTO user(email) VALUES(?)').run(email);

			const schema = z.object({ registered: z.number() });
			const { registered } = schema.parse(
				db.prepare('SELECT COUNT(*) AS registered FROM registration WHERE user = ?').get(email)
			);

			if (registered + 1 > MAX_REGISTERED) {
				return 'limit-exceeded';
			}

			const expiry = new Date();
			expiry.setMonth(expiry.getMonth() + 1);
			const { changes: registrationChanges } = db
				.prepare(
					'INSERT OR IGNORE INTO registration(user,locker,name,expiry) VALUES(?,?,?,datetime(?))'
				)
				.run(email, locker, name, expiry.toISOString());
			if (registrationChanges == 0) {
				return 'locker-taken';
			}
			return 'ok';
		})();
		db.close();

		switch (result) {
			case 'locker-taken':
				return setError(form, 'locker', 'This locker is taken, please register another');
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
		return setMessage(form, { msg });
		// throw redirect(302, `/flash?msg=${msg}`);
	}
};
