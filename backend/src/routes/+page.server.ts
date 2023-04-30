import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: () => {
		const msg = 'Almost done! Check your email for a link to finish registering.';
		throw redirect(302, `/flash?msg=${msg}`);
	}
};
