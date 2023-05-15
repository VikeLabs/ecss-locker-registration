import { error, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { mustAuthorize } from "$lib/auth.server";
import { sendTransferEmail } from "$lib/email";
import { z } from "zod";
import { setError, superValidate } from "sveltekit-superforms/server";
import { db } from "$lib/db";

const formSchema = z.object({
  email: z.string().email(),
});

export const load: PageServerLoad = async ({ params, cookies }) => {
  await mustAuthorize(cookies); // TODO remove after testing its not needed
  const form = await superValidate(formSchema);
  return { form };
};

export const actions: Actions = {
  default: async ({ params, cookies, request }) => {
    const { user } = await mustAuthorize(cookies); // TODO remove after testing its not needed
    const locker = params.id;

    const form = await superValidate(request, formSchema);
    if (!form.valid) {
      return { form };
    }
    const { email } = form.data;
    const { count } = await db
      .selectFrom("registration")
      .select([db.fn.countAll<string>().as("count")])
      .where("user", "=", user)
      .where("locker", "=", locker)
      .executeTakeFirstOrThrow();

    if (+count === 0) {
      return error(403, { message: "You do not own this locker" });
    }

    sendTransferEmail(email, locker);
    throw redirect(302, "..");
  },
};
