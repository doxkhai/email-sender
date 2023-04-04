import { Router } from "express";
import { receiverExist } from "../../common/middleware/checkExist";
import { EmailDTO } from "../../common/types/email.dto";
import responseToClient from "../../utils/response";
import { sendMail } from "./service";
import { HttpCode } from "../../common/types/error.enum";

const router = Router();

router.post(
  "/:receiver",
  receiverExist(false),
  async ({ params: { receiver }, body: { subject, text } }, res, next) => {
    try {
      await sendMail(
        new EmailDTO({
          receiver,
          subject,
          text,
        })
      );
      return res
        .status(HttpCode.CREATED)
        .json(
          responseToClient({ status: HttpCode.CREATED, message: "Mail sent successfully" })
        );
    } catch (e) {
      next(e);
    }
  }
);

export default router;
