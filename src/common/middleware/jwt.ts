import { RequestHandler } from "express";
import { verifyJwt } from "../../utils/jwt";

const verifyJWT = (name: string, where: "params" | "body" = "params"): RequestHandler => {
  return async (req, res, next) => {
    const jwt = req[where][name];
    try {
      res.locals.payload = verifyJwt(jwt, {});
      return next();
    } catch (e) {
      const err = new Error('Verification failed')
      err.name = '400';
      return next(err)
    }
  };
};

export { verifyJWT };
