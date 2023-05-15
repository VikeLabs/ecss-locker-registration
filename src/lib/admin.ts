import { ADMIN_PASSWORD } from '$env/static/private';

let password: string = ADMIN_PASSWORD;
if (!password) {
	throw Error('ADMIN_PASSWORD undefined');
}
export function getAdminPassword() {
	return password;
}

export function setAdminPassword(newPassword: string) {
	password = newPassword;
}
