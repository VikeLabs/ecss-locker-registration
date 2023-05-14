import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { error, type Cookies } from '@sveltejs/kit';

const cookieName = 'admin';

const secret = env.JWT_SECRET;
const algo = 'HS256';

export function login(cookies: Cookies) {
	const token = jwt.sign('nothing lol', secret, { algorithm: algo });
	cookies.set(cookieName, token, { path: '/' });
}

export function logout(cookies: Cookies) {
	cookies.set(cookieName, '', { path: '/', maxAge: 0 });
}

export type AuthResult =
	| {
			authorized: false;
	  }
	| {
			authorized: true;
	  };

export function authorize(cookies: Cookies): AuthResult {
	const token = cookies.get(cookieName);
	if (!token) {
		return { authorized: false };
	}
	try {
		jwt.verify(token, secret, { algorithms: [algo] });
		return {
			authorized: true
		};
	} catch (e) {
		return { authorized: false };
	}
}
export function mustAuthorize(cookies: Cookies) {
	const auth = authorize(cookies);
	if (!auth.authorized) {
		throw error(401);
	}
}
