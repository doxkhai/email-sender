import { RequestHandler } from "express";
import { verifyJwt } from "../../utils/jwt";
import AppError from "../../utils/appError";
import { HttpCode } from "../types/error.enum";

const verifyJWT = (name: string, where: "params" | "body" = "params"): RequestHandler => {
  return async (req, res, next) => {
    const jwt = req[where][name];
    try {
      res.locals.payload = verifyJwt(jwt, {});
      return next();
    } catch (e) {
      return next(AppError('Verification failed', HttpCode.UNAUTHORIZED))
    }
  };
};

export { verifyJWT };
