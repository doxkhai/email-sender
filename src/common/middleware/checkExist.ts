import { RequestHandler } from "express";
import client from "../../config/db";
import isEmail from "../validator/email.validator";

const receiverExist = (errorIfExist = true): RequestHandler => {
  return async (req, _res, next) => {
    try {
      const receiverEmail: string = isEmail(req.params.receiver);
      if (!receiverEmail) {
        const err = new Error("Specified receiver email");
        err.name = "400";
        throw err;
      }

      const exist = (await client.get(receiverEmail)) === "true";
      if ((errorIfExist && exist) || (!errorIfExist && !exist)) {
        const err = new Error(`Receiver ${exist ? "" : "not "}subscribed`);
        err.name = "400";
        throw err;
      }

      return next();
    } catch (e) {
      return next(e);
    }
  };
};

export { receiverExist };
