import { RequestHandler } from "express";
import { verifyJwt } from "../../utils/jwt";
import responseToClient from "../../utils/response";

const verifyJWT = (name: string, where: "params" | "body" = "params"): RequestHandler => {
  return async (req, res, next) => {
    const jwt = req[where][name];
    try {
      res.locals.payload = verifyJwt(jwt, {});
      next();
    } catch (e) {
      return res
        .status(400)
        .json(
          responseToClient({ status: 400, message: "Verification failed" })
        );
    }
  };
};

export { verifyJWT };
