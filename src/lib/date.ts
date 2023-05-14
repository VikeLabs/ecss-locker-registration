export function defaultExpiry(now: Date = new Date()): Date {
	const term = Math.floor(now.getMonth() / 4);
	if (term === 2) {
		return new Date(now.getFullYear() + 1, 0, 1);
	}
	return new Date(now.getFullYear(), term * 4 + 4, 1);
}
