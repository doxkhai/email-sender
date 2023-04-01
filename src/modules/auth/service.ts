import client from "../../config/db";
import { mailer } from "../mailer/service";
import * as constants from "../../common/constants";
import { signJwt } from "../../utils/jwt";
import { verifyForm } from "../../utils/verifyForm";

async function sendVerification(email: string) {
  const emailSlug = signJwt({email}, {})

  const mailOption = {
    to: email,
    subject: constants.EMAIL_VERIFY_SUBJECT,
    html: verifyForm(constants.EMAIL_VERIFY_TEXT, emailSlug),
  };

  return mailer(mailOption);
}

async function registerEmail(email: string) {
  const exist = await client.get(email);
  if (exist === "true") return false;

  return sendVerification(email);
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
