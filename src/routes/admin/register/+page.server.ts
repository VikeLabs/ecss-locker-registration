import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { db } from '$lib/db';
import { defaultExpiry } from '$lib/date';

const formSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	locker: z.string(),
	expiry: z.date()
});

export const load: PageServerLoad = async ({ request }) => {
	const form = await superValidate(formSchema);
	const url = new URL(request.url);
	form.data.locker = url.searchParams.get('locker') ?? '';
	form.data.expiry = defaultExpiry(new Date());
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, formSchema);
		if (!form.valid) {
			return fail(400, { form });
		}
		const { email, locker, name, expiry } = form.data;

		const result = await db.transaction().execute(async (trx) => {
			await trx.insertInto('user').ignore().columns(['email']).values({ email }).execute();

			const q = trx
				.insertInto('registration')
				.ignore()
				.columns(['user', 'locker', 'name', 'expiry'])
				.values({ user: email, locker, name, expiry });
			const result = await q.executeTakeFirstOrThrow();
			if (result.numInsertedOrUpdatedRows === 0n) {
				return 'locker-taken';
			}
			return 'ok';
		});
		if (result === 'locker-taken') {
			return setError(form, 'locker', 'This locker is taken, please register another');
		}
		throw redirect(302, `./`);
	}
};
