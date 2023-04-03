import { RequestHandler } from "express";

const loggerMiddleware: RequestHandler = (req, _res, next) => {
  console.log(`[${req.method}] ${req.originalUrl} :`);
  console.dir({ body: req.body }, { depth: null });
  next();
};

export { loggerMiddleware };
