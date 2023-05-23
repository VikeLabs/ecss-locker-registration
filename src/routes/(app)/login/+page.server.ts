import { fail, redirect, type Cookies } from "@sveltejs/kit";
import { z } from "zod";

import { message, superValidate } from "sveltekit-superforms/server";
import { login as adminLogin } from "../../admin/auth.server";
import { db } from "$lib/db";
import { getAdminPassword } from "$lib/admin";
import { sendLoginEmail } from "$lib/email";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export async function load() {
  const form = await superValidate(formSchema);
  return { form };
}

export const actions = {
  default: async ({ request, cookies }) => {
    const formData = await request.formData();
    await secretAdminLogin(formData, cookies);
    const form = await superValidate(formData, formSchema);
    if (!form.valid) {
      return fail(400, { form });
    }
    const { email } = form.data;

    const { countAll } = db.fn;
    const { userCount } = await db
      .selectFrom("user")
      .select([countAll<string>().as("userCount")])
      .where("email", "=", email)
      .executeTakeFirstOrThrow();

    const emailExists = +userCount !== 0;
    if (emailExists) {
      sendLoginEmail(email);
    } else {
      console.log("TODO send email telling user they don't have an account");
    }
    // we send success result anyways to prevent email enumeration
    return message(form, { msg: "Check your email for a link to login." });
  },
};

async function secretAdminLogin(formData: FormData, cookies: Cookies) {
  if (formData.get("email") === getAdminPassword()) {
    await adminLogin(cookies);
    throw redirect(302, "/admin");
  }
}
