import { env } from "$env/dynamic/private";

let password: string = env.ADMIN_PASSWORD;
if (!password) {
  throw Error("ADMIN_PASSWORD undefined");
}
export function getAdminPassword() {
  return password;
}

export function setAdminPassword(newPassword: string) {
  password = newPassword;
}
