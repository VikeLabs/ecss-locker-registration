import {
  setError,
  setMessage,
  superValidate,
} from "sveltekit-superforms/server";
import * as XLSX from "xlsx";
import { z } from "zod";
import { fail } from "@sveltejs/kit";
import { defaultExpiry } from "$lib/date.js";
import { db } from "$lib/db.js";

const formSchema = z.object({
  sheet: z.undefined(), // Files are ignored by superforms
});

export async function load() {
  const form = await superValidate(formSchema);
  return { form };
}

export const actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    console.log(formData);
    const form = await superValidate(formData, formSchema);
    if (!form.valid) {
      return fail(400, { form });
    }
    const sheetFile = formData.get("sheet");
    console.log(sheetFile);
    if (!sheetFile || !(sheetFile instanceof File) || sheetFile.size === 0) {
      return setError(form, "sheet", "No file uploaded");
    }
    const sheets = XLSX.read(await sheetFile.arrayBuffer());
    const sheet = sheets.Sheets[sheets.SheetNames[0]];
    const unparsedData = XLSX.utils.sheet_to_json(sheet);
    if (unparsedData.length === 0) {
      return setError(form, "sheet", "Sheet is empty");
    }
    const parsed = z
      .array(
        z.object({
          locker: z.string(),
          name: z.string(),
          email: z.string().email(),
        })
      )
      .min(1)
      .safeParse(unparsedData);
    if (!parsed.success) {
      return setError(
        form,
        "sheet",
        'Expected columns "locker", "name", "email"'
      );
    }
    const { data } = parsed;

    const stats = await db.transaction().execute(async (trx) => {
      const user = await trx
        .insertInto("user")
        .ignore()
        .columns(["email"])
        .values(data.map((row) => ({ email: row.email })))
        .executeTakeFirstOrThrow();

      const locker = await trx
        .insertInto("locker")
        .ignore()
        .columns(["id"])
        .values(data.map((row) => ({ id: row.locker })))
        .executeTakeFirstOrThrow();

      const registration = await trx
        .insertInto("registration")
        .ignore()
        .columns(["locker", "user", "name"])
        .values(
          data.map((row) => ({
            locker: row.locker,
            user: row.email,
            name: row.name,
            expiry: defaultExpiry(),
          }))
        )
        .executeTakeFirstOrThrow();
      return { user, locker, registration };
    });

    // TODO import stuff

    let msg = "";
    if (stats.user.numInsertedOrUpdatedRows ?? 0n !== 0n) {
      msg += `${stats.user.numInsertedOrUpdatedRows} users added\n`;
    }
    if (stats.locker.numInsertedOrUpdatedRows ?? 0n !== 0n) {
      msg += `${stats.locker.numInsertedOrUpdatedRows} lockers added\n`;
    }
    if (stats.registration.numInsertedOrUpdatedRows ?? 0n !== 0n) {
      msg += `${stats.registration.numInsertedOrUpdatedRows} lockers registered`;
    }

    if (msg === "") {
      msg = "No changes made, all data already exists";
    } else {
      msg = "Import successful\n" + msg;
    }

    return setMessage(form, {
      msg,
      type: "success",
    });
  },
};
