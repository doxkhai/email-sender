import { RequestHandler } from "express";
import client from "../../config/db";

const receiverExist = (where: "params" | "body" = "params"): RequestHandler => {
  return async (req, res, next) => {
    try {
      const receiverEmail: string = req[where].receiver;
      if (!receiverEmail) throw new Error();

      const exist = await client.get(receiverEmail);
      res.locals.receiverExist = exist === "true";
      return next();
    } catch (e) {
      const err = new Error('Specified receiver email')
      err.name = '400';
      return next(err)
    }
  };
};

export { receiverExist };
