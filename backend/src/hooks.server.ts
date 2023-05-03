import { base } from '$app/paths';
import { text, type Handle } from '@sveltejs/kit';
import { authorize } from './routes/admin/auth.server';

export const handle: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith(`${base}/admin`) && !authorize(event.cookies).authorized) {
		return text('Sorry bud, no can do!', { status: 401 });
	}
	return resolve(event);
};
