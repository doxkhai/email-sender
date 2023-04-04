import { RequestHandler } from "express";
import client from "../../config/db";
import isEmail from "../validator/email.validator";
import AppError from "../../utils/appError";
import { HttpCode } from "../types/error.enum";

const receiverExist = (errorIfExist = true): RequestHandler => {
  return async (req, _res, next) => {
    try {
      const receiverEmail: string = isEmail(req.params.receiver);
      if (!receiverEmail) 
        throw AppError('Specified receiver email', HttpCode.BAD_REQUEST)
      

      const exist = (await client.get(receiverEmail)) === "true";
      if ((errorIfExist && exist) || (!errorIfExist && !exist)) {
        throw AppError(`Receiver ${exist ? "" : "not "}subscribed`, HttpCode.BAD_REQUEST);
      }

      return next();
    } catch (e) {
      return next(e);
    }
  };
};

export { receiverExist };
