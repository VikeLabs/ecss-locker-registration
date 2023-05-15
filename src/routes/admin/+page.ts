import type { PageLoad } from './$types';

export const load: PageLoad = ({ data }) => {
	const registration = data.registration.map((data) => {
		let status: 'claimed' | 'available' | 'expired' = 'claimed';
		if (data.user === null || data.expiry === null || data.name === null) {
			status = 'available';
			return { ...data, expiry: null, status };
		} else {
			const expiry = data.expiry;
			if (expiry.valueOf() < Date.now()) {
				status = 'expired';
			}
			return {
				...data,
				expiry: new Date(expiry),
				status
			};
		}
	});

	return { registration };
};
