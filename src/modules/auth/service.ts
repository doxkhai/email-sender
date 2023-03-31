import client from "../../config/db";
import { mailer } from "../mailer/service";
import * as constants from "../../common/constants";
import { signJwt } from "../../utils/jwt";

async function sendVerification(email: string, host: string) {
  const emailSlug = signJwt({email})
  const verificationLink = `${host}/auth/verify/${emailSlug}`;

  const mailOption = {
    to: email,
    subject: constants.EMAIL_VERIFY_SUBJECT,
    text: constants.EMAIL_VERIFY_TEXT + "\n" + verificationLink,
  };

  return mailer(mailOption);
}

async function registerEmail(email: string, host: string) {
  const exist = await client.get(email);
  if (exist === "true") return false;

  return sendVerification(email, host);
}

async function subscribeEmail(email: string) {
  const res = await client.set(email, "true");
  if (res !== "OK") throw new Error("Something wrong with DB");
}

async function unSubscribeEmail(email: string) {
  const res = await client.set(email, "false");
  if (res !== "OK") throw new Error("Something wrong with DB");
}

export { subscribeEmail, registerEmail, unSubscribeEmail };
