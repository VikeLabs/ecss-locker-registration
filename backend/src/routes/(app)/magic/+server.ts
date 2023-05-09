import { json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async (event) => {
	// TODO: Implement
	// plan is to give the user a signed JWT with an action to perform
	// by clicking the link, the action is performed
	return json({ message: 'TODO' });
};
