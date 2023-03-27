import { Router } from "express";
import { EmailDTO } from "../../types/email.dto";
import responseToClient from "../../utils/response";
import mailer from "./mailer";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const result = await mailer(new EmailDTO(req.body));
    return res
      .status(201)
      .json(responseToClient({ status: 201, data: result }));
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export default router;
