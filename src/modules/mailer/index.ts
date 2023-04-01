import { Router } from "express";
import { receiverExist } from "../../common/middleware/checkExist";
import { EmailDTO } from "../../common/types/email.dto";
import responseToClient from "../../utils/response";
import { sendMail } from "./service";

const router = Router();

router.post(
  "/:receiver",
  receiverExist(),
  async (
    { params: { receiver }, body: { subject, text }},
    res,
    next
  ) => {
    try {
      const exist = res.locals.receiverExist;
      if (!exist)
        return res.status(400).json(
          responseToClient({
            status: 400,
            message: "Receiver not subscribed yet",
          })
        );

      await sendMail(
        new EmailDTO({
          receiver,
          subject,
          text,
        }),
      );
      return res
        .status(201)
        .json(
          responseToClient({ status: 201, message: "Mail sent successfully" })
        );
    } catch (e) {
      console.log(e);
      next(e);
    }
  }
);

export default router;
