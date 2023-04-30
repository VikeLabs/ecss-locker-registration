import { redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export type LockerStatus = 'expired' | 'available' | 'claimed';
export type Locker = {
	name: string;
	locker: string;
	status: LockerStatus;
};

const lockers: {
	[key: string]: {
		name: string;
		status: LockerStatus;
	};
} = {
	'120': {
		name: 'Malcolm Seyd',
		status: 'expired'
	},
	'144': {
		name: 'VikeSec',
		status: 'claimed'
	}
};

export const load: PageServerLoad<Locker> = ({ params }) => {
	const lockerId = params.id;
	const lockerData = lockers[lockerId];
	if (lockerData === undefined) {
		throw error(404, "Locker doesn't exist");
	}
	return { ...lockerData, locker: lockerId };
};

export const actions: Actions = {
	renew: async ({ params, route }) => {
		console.log(`UNIMPLEMENTED: renewing locker ${params.id}`);
		await new Promise((r) => setTimeout(r, 1000));
		throw redirect(302, `./${params.id}`);
	}
};
