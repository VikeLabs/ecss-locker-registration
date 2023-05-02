import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import sqlite3 from 'better-sqlite3';
import { z } from 'zod';

import { superValidate } from 'sveltekit-superforms/server';
import { login } from '$lib/auth.server';

const formSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' })
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(formSchema);
	return { form };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, formSchema);
		if (!form.valid) {
			return fail(400, { form });
		}
		const { email } = form.data;

		const db = sqlite3('db.sqlite3');
		const emailExists = db.transaction(() => {
			const schema = z.object({ userCount: z.number() });
			const { userCount } = schema.parse(
				db.prepare('SELECT COUNT(*) AS userCount FROM user WHERE email = ?').get(email)
			);

			return userCount !== 0;
		})();
		db.close();

		if (emailExists) {
			// TODO actually send email
			// do this asyncronously to prevent timing
		}

		// we send success result anyways to prevent email enumeration
		// TODO make page that says "check your email"
		login({ user: email }, cookies);
		throw redirect(302, 'lockers');
	}
};
