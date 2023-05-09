import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { db } from '$lib/db';
import { sql } from 'kysely';

const formSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	locker: z.string(),
	expiry: z.date()
});

export const load: PageServerLoad = async ({ request }) => {
	const form = await superValidate(formSchema);
	const url = new URL(request.url);
	const locker = url.searchParams.get('locker');
	if (locker === null) {
		return { form };
	}
	form.data.locker = locker;
	const lockerData = await db
		.selectFrom('registration')
		.select(['expiry', 'locker', 'name', 'user'])
		.where('locker', '=', locker)
		.executeTakeFirst();
	if (lockerData === undefined) {
		return { form };
	}
	form.data.email = lockerData.user;
	form.data.name = lockerData.name;
	form.data.expiry = new Date(lockerData.expiry);
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, formSchema);
		if (!form.valid) {
			return fail(400, { form });
		}
		const { email, locker, name, expiry } = form.data;
		if (Number.isNaN(expiry.valueOf())) {
			return setError(form, 'expiry', 'Invalid date');
		}

		const result = await db.transaction().execute(async (trx) => {
			await trx
				.insertInto('user')
				.onConflict((c) => c.doNothing())
				.columns(['email'])
				.values({ email })
				.execute();

			const result = await trx
				.updateTable('registration')
				.set({ user: email, name, expiry: sql`datetime(${expiry.toISOString()})` })
				.where('locker', '=', locker)
				.executeTakeFirst();

			if (result.numUpdatedRows === 0n) {
				return 'wrong-locker';
			}
			return 'ok';
		});
		if (result === 'wrong-locker') {
			return setError(form, 'locker', 'Something went wrong, please try another locker');
		}
		throw redirect(302, `./`);
	}
};
