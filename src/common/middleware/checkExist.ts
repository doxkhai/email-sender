import { RequestHandler } from "express";
import client from "../../config/db";
import responseToClient from "../../utils/response";

const receiverExist = (where: "params" | "body" = "params"): RequestHandler => {
  return async (req, res, next) => {
    try {
      const receiverEmail: string = req[where].receiver;
      console.log(req.body.receiver)
      if (!receiverEmail) throw new Error();

      const exist = await client.get(receiverEmail);
      res.locals.receiverExist = exist === "true";
      return next();
    } catch (e) {
      return res.status(400).json(
        responseToClient({
          status: 400,
          message: "Specified receiver email",
        })
      );
    }
  };
};

export { receiverExist };
