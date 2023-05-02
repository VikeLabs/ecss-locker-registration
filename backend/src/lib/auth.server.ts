import jwt from 'jsonwebtoken';
import { env } from '$env/dynamic/private';
import { error, type Cookies } from '@sveltejs/kit';
import { z } from 'zod';

const cookieName = 'auth';

const secret = env.JWT_SECRET;
const algo = 'HS256';

const AuthDataSchema = z.object({
	user: z.string()
});
export type AuthData = z.infer<typeof AuthDataSchema>;

export function login(data: AuthData, cookies: Cookies) {
	const token = jwt.sign(data, secret, { algorithm: algo, expiresIn: '1d' });
	cookies.set(cookieName, token, { path: '/' });
}

export function logout(cookies: Cookies) {
	cookies.set(cookieName, '', { path: '/', maxAge: 0 });
}

export type AuthResult =
	| {
			authorized: false;
	  }
	| ({
			authorized: true;
	  } & AuthData);

export function authorize(cookies: Cookies): AuthResult {
	const token = cookies.get('auth');
	if (!token) {
		return { authorized: false };
	}
	try {
		const jsonData = jwt.verify(token, secret, { algorithms: [algo] });
		return {
			...AuthDataSchema.parse(jsonData),
			authorized: true
		};
	} catch (e) {
		return { authorized: false };
	}
}
export function mustAuthorize(cookies: Cookies): AuthData {
	const auth = authorize(cookies);
	if (!auth.authorized) {
		throw error(401);
	}
	return auth;
}
