import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { mustAuthorize } from '$lib/auth.server';

export const actions: Actions = {
	default: ({ params, cookies }) => {
		const { user } = mustAuthorize(cookies);
		console.log(`UNIMPLEMENTED: transferring locker ${params.id}`);
		throw redirect(302, '.');
	}
};
