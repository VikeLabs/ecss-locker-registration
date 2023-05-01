import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: ({ params }) => {
		console.log(`UNIMPLEMENTED: transferring locker ${params.id}`);
		throw redirect(302, '.');
	}
};
