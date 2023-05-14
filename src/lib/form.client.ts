import type { AnyZodObject } from 'zod';
import { superForm as defaultSuperForm } from 'sveltekit-superforms/client';

type Message = {
	msg: string;
};

export function superForm<T extends AnyZodObject>(
	...params: Parameters<typeof defaultSuperForm<T>>
) {
	return defaultSuperForm<T, Message>(params[0], {
		delayMs: 100,
		taintedMessage: null,
		clearOnSubmit: 'none',
		...params[1]
	});
}
