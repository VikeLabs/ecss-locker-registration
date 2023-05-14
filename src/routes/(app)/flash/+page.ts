import type { PageLoad } from './$types';

export const load: PageLoad<{ msg: string }> = ({ url }) => {
	const msg = url.searchParams.get('msg') ?? '';
	return { msg };
};
