import client from "../../config/db";
import { mailer } from "../mailer/service";
import * as constants from "../../common/constants";
import { signJwt } from "../../utils/jwt";

async function sendVerification(email: string, hostname: string) {
  const emailSlug = signJwt({email})
  const verificationLink = `${hostname}/auth/verify/${emailSlug}`;

  const mailOption = {
    receiver: email,
    subject: constants.EMAIL_VERIFY_SUBJECT,
    text: constants.EMAIL_VERIFY_TEXT + "\n" + verificationLink,
  };

  return mailer(mailOption);
}

async function registerEmail(email: string, hostname: string) {
  const exist = await client.get(email);
  if (exist === "true") return false;

  return sendVerification(email, hostname);
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
