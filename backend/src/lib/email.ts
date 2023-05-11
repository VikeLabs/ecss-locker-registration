import { base } from '$app/paths';
import { env } from '$env/dynamic/private';
import { makeMagicToken } from './magic';

const prefix = env.URL_PREFIX ?? '';
const urlBase = prefix + base;

function makeLink(path: string) {
	return new URL(path, urlBase);
}

function makeMagicLink(token: string) {
	return makeLink(`magic/${encodeURIComponent(token)}`);
}

export function sendRegisterEmail(email: string, locker: string, name: string) {
	console.log(`TODO register locker ${locker} to ${email}`);
	const token = makeMagicToken({ type: 'register', user: email, locker, name });
	const msg = `Click here to register locker ${locker}: ${makeMagicLink(token)}`;
	console.log(msg);
}

export function sendLoginEmail(email: string) {
	console.log(`TODO login email to ${email}`);
	const token = makeMagicToken({ type: 'login', user: email });
	const msg = `Click here to login: ${makeMagicLink(token)}`;
	console.log(msg);
}

export function sendTransferEmail(email: string, locker: string) {
	console.log(`TODO transfer locker ${locker} to ${email}`);
	const token = makeMagicToken({ type: 'transfer', user: email, locker });
	const msg = `You have been sent a locker transfer request for locker ${locker}. Click here to accept: ${makeMagicLink(
		token
	)}`;
	console.log(msg);
}

export function sendExpiryEmail(email: string, locker: string) {
	console.log(`TODO expiry reminder about locker ${locker} to ${email}`);
	const msg = `Your locker ${locker} is about to expire. Renew it at ${makeLink(
		`lockers/${locker}`
	)}`;
	console.log(msg);
}
