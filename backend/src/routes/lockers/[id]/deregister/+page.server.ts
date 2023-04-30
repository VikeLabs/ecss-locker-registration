import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: ({ params }) => {
		console.log(`UNIMPLEMENTED: deregistering locker ${params.id}`);
		throw redirect(302, '..');
	}
};
