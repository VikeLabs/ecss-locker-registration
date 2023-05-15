import { redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { logout, mustAuthorize } from "$lib/auth.server";
import { db } from "$lib/db";

export const load: PageServerLoad = async ({ cookies }) => {
  const { user } = await mustAuthorize(cookies);

  const result = await db
    .selectFrom("registration")
    .select(["name", "locker"])
    .where("user", "=", user)
    .execute();
  return { locker: result };
};

export const actions: Actions = {
  logout: ({ cookies }) => {
    logout(cookies);
    throw redirect(302, "../login");
  },
};
