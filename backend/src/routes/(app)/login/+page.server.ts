import { fail, redirect, type Cookies } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';

import { setError, superValidate } from 'sveltekit-superforms/server';
import { login } from '$lib/auth.server';
import { login as adminLogin } from '../../admin/auth.server';
import { db } from '$lib/db';
import { getAdminPassword } from '$lib/admin';

const formSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' })
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(formSchema);
	return { form };
};

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		await secretAdminLogin(formData, cookies);
		const form = await superValidate(formData, formSchema);
		if (!form.valid) {
			return fail(400, { form });
		}
		const { email } = form.data;

		const { countAll } = db.fn;
		const { userCount } = await db
			.selectFrom('user')
			.select([countAll<number>().as('userCount')])
			.where('email', '=', email)
			.executeTakeFirstOrThrow();

		const emailExists = userCount !== 0;
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

async function secretAdminLogin(formData: FormData, cookies: Cookies) {
	if (formData.get('email') === getAdminPassword()) {
		adminLogin(cookies);
		throw redirect(302, '/admin');
	}
}
