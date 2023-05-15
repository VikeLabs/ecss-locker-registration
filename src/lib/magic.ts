import { env } from '$env/dynamic/private';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

const magicDataSchema = z.union([
	z.object({
		type: z.literal('register'),
		user: z.string(),
		locker: z.string(),
		name: z.string()
	}),
	z.object({
		type: z.literal('login'),
		user: z.string()
	}),
	z.object({
		type: z.literal('transfer'),
		user: z.string(),
		locker: z.string()
	})
]);

export type MagicData = z.infer<typeof magicDataSchema>;

const secret = env.JWT_SECRET;
const algo = 'HS256';

export function makeMagicToken(data: MagicData) {
	return jwt.sign(data, secret, { algorithm: algo, expiresIn: '1d' });
}

export function parseMagicToken(token: string): MagicData {
	return magicDataSchema.parse(jwt.verify(token, secret, { algorithms: [algo] }));
}
