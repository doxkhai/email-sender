import { Router } from "express";
import { receiverExist } from "../../common/middleware/checkExist";
import { verifyJWT } from "../../common/middleware/jwt";
import isEmail from "../../common/validator/email.validator";
import responseToClient from "../../utils/response";
import { registerEmail, subscribeEmail, unSubscribeEmail } from "./service";
import { HttpCode } from "../../common/types/error.enum";

const router = Router();

// TODO:
/*
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
      return res.status(HttpCode.CREATED).json(
        responseToClient({
          status: HttpCode.CREATED,
          message:
            "Verification is sent to your email, click the link to verify your subscription.",
        })
      );
    } catch (e) {
      next(e);
    }
  }
);

router.get("/verify/:jwt", verifyJWT("jwt"), async (_req, res, next) => {
  try {
    const { email }: { email: string } = res.locals.payload;
    await subscribeEmail(email);

    return res.status(HttpCode.ACCEPTED).json(
      responseToClient({
        status: HttpCode.ACCEPTED,
        message: "Email subscribed successfully!",
      })
    );
  } catch (e) {
    next(e);
  }
});

router.get("/unsubscribe/:jwt", verifyJWT("jwt"), async (_req, res, next) => {
  try {
    const { email }: { email: string } = res.locals.payload;
    await unSubscribeEmail(email);

    return res.status(HttpCode.ACCEPTED).json(
      responseToClient({
        status: HttpCode.ACCEPTED,
        message: "Email unsubscribed successfully!",
      })
    );
  } catch (e) {
    next(e);
  }
});

export default router;
