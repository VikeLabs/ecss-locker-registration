import { fail } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { z } from "zod";
import { message, setError, superValidate } from "sveltekit-superforms/server";
import { db } from "$lib/db";
import { sendRegisterEmail } from "$lib/email";

const MAX_REGISTERED = 1;

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  locker: z.string(),
});

export const load: PageServerLoad = async () => {
  const form = await superValidate(formSchema);
  // TODO return a list of available lockers for autocomplete
  return { form };
};

export const actions: Actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, formSchema);
    if (!form.valid) {
      return fail(400, { form });
    }
    const { email, locker, name } = form.data;

    const result = await db.transaction().execute(async (trx) => {
      // TODO this could be merged into a subquery with coalesce
      const { registered } = await trx
        .selectFrom("registration")
        .select(db.fn.countAll<string>().as("registered"))
        .where("user", "=", email)
        .executeTakeFirstOrThrow();
      if (+registered + 1 > MAX_REGISTERED) {
        return "limit-exceeded";
      }
      const { lockers } = await trx
        .selectFrom("registration")
        .select(db.fn.countAll<string>().as("lockers"))
        .where("locker", "=", locker)
        .executeTakeFirstOrThrow();
      if (+lockers > 0) {
        return "locker-taken";
      }
      return "ok";
    });

    switch (result) {
      case "locker-taken":
        return setError(
          form,
          "locker",
          "This locker is taken, please register another"
        );
      case "limit-exceeded":
        // TODO send email telling them they can only register one
        console.log("TODO send email telling user they can only register one");
        break;
      case "ok":
        // TODO send verification email
        sendRegisterEmail(email, locker, name);
        break;
    }
    const msg =
      "Almost done! Check your email for a link to finish registering.";
    return message(form, { msg });
  },
};
