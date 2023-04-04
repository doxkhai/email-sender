import { Router } from "express";
import { receiverExist } from "../../common/middleware/checkExist";
import { verifyJWT } from "../../common/middleware/jwt";
import isEmail from "../../common/validator/email.validator";
import responseToClient from "../../utils/response";
import { registerEmail, subscribeEmail, unSubscribeEmail } from "./service";

const router = Router();

// TODO:
/*
 *  - use constants for status codes
 *  - implement checking health on specific paths
 *  - use handlebars to handle html
 *  - (optional) refactor
 */

router.post(
  "/subscribe/:receiver",
  receiverExist(true),
  async ({ params: { receiver } }, res, next) => {
    try {
      await registerEmail(isEmail(receiver));
      return res.status(201).json(
        responseToClient({
          status: 201,
          message:
            "Verification is sent to your email, click the link to verify your subscription.",
        })
      );
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);

router.get("/verify/:jwt", verifyJWT("jwt"), async (_req, res, next) => {
  try {
    const { email }: { email: string } = res.locals.payload;
    await subscribeEmail(email);

    return res.status(202).json(
      responseToClient({
        status: 202,
        message: "Email subscribed successfully!",
      })
    );
  } catch (e) {
    console.log(e);
    next(e);
  }
});

router.get("/unsubscribe/:jwt", verifyJWT("jwt"), async (_req, res, next) => {
  try {
    const { email }: { email: string } = res.locals.payload;
    await unSubscribeEmail(email);

    return res.status(202).json(
      responseToClient({
        status: 202,
        message: "Email unsubscribed successfully!",
      })
    );
  } catch (e) {
    console.log(e);
    next(e);
  }
});

export default router;
