import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';

import { setError, superValidate } from 'sveltekit-superforms/server';
import { login } from '$lib/auth.server';
import { db } from '$lib/db';

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

		const { countAll } = db.fn;
		const { userCount } = z
			.array(z.object({ userCount: z.number() }))
			.length(1)
			.parse(
				await db
					.selectFrom('user')
					.select([countAll().as('userCount')])
					.where('email', '=', email)
					.execute()
			)[0];

		const emailExists = userCount !== 0;
		console.log({ emailExists, email });
		if (emailExists) {
			// TODO actually send email
			// do this asyncronously to prevent timing
			login({ user: email }, cookies);
			throw redirect(302, 'lockers');
		}
		// we send success result anyways to prevent email enumeration
		// TODO flash message that says "check your email"
		return setError(form, 'email', 'Account does not exist.');
	}
};
