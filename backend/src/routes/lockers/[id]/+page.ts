import type { PageLoad } from './$types';

type LockerStatus = 'expired' | 'available' | 'claimed';

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

export const load: PageLoad<{
	name: string;
	locker: string;
	status: LockerStatus;
}> = ({ params }) => {
	const locker = params.id;
	const data = lockers[locker];
	return { ...data, locker };
};
