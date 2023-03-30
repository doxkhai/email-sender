import { Router } from "express";
import { receiverExist } from "../../common/middleware/checkExist";
import { verifyJWT } from "../../common/middleware/jwt";
import isEmail from "../../common/validator/email.validator";
import responseToClient from "../../utils/response";
import { registerEmail, subscribeEmail, unSubscribeEmail } from "./service";

const router = Router();

router.post(
  "/subscribe",
  receiverExist("body"),
  async ({ body: { email }, hostname }, res, next) => {
    try {
      const exist = res.locals.receiverExist;
      if (exist)
        return res
          .status(200)
          .json(responseToClient({ message: "Email already subscribed" }));

      await registerEmail(isEmail(email), hostname);
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

router.get("unsubscribe/:jwt", verifyJWT("jwt"), async (req, res, next) => {
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
