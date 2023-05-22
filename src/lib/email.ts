import { base } from "$app/paths";
import { makeMagicToken } from "./magic";
import { env } from "$env/dynamic/private";
import { SMTPClient } from "emailjs";

const client = new SMTPClient({
  host: "smtp.gmail.com",
  port: 465,
  ssl: true,
  user: env.GMAIL_USER,
  password: env.GMAIL_PASSWORD,
});

let prefix = "";
// called from src/hooks.server.ts on every request (hopefully)
export function setOrigin(url: string) {
  prefix = url;
}

function makeLink(path: string) {
  return new URL(path, prefix + base);
}

function makeMagicLink(token: string) {
  return makeLink(`magic/${encodeURIComponent(token)}`);
}

export async function sendRegisterEmail(
  email: string,
  locker: string,
  name: string
) {
  const token = await makeMagicToken({
    type: "register",
    user: email,
    locker,
    name,
  });
  const text = `Click here to register locker ${locker} for ${email}: ${makeMagicLink(
    token
  )}`;
  await client.sendAsync({
    from: `Lockers <${env.GMAIL_USER}>`,
    to: email,
    subject: `ESS Locker Registration: ${locker}`,
    text,
  });
}

export async function sendLoginEmail(email: string) {
  const token = await makeMagicToken({ type: "login", user: email });
  const text = `Click here to login as ${email}: ${makeMagicLink(token)}`;
  await client.sendAsync({
    from: `Lockers <${env.GMAIL_USER}>`,
    to: email,
    subject: `ESS Locker Login`,
    text,
  });
}

export async function sendTransferEmail(email: string, locker: string) {
  const token = await makeMagicToken({ type: "transfer", user: email, locker });
  const text = `You have been sent a locker transfer request for locker ${locker}. Click here to accept: ${makeMagicLink(
    token
  )}`;
  await client.sendAsync({
    from: `Lockers <${env.GMAIL_USER}>`,
    to: email,
    subject: `ESS Locker Transfer Request: ${locker}`,
    text,
  });
}

export async function sendExpiryEmail(email: string, locker: string) {
  const msg = `Your locker ${locker} has expired. Renew it at ${makeLink(
    `lockers/${locker}`
  )}`;
  await client.sendAsync({
    from: `Lockers <${env.GMAIL_USER}>`,
    to: email,
    subject: `ESS Locker Expiry: ${locker}`,
    text: msg,
  });
}
