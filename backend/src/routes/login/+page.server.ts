import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: () => {
		throw redirect(302, 'lockers');
	}
};
