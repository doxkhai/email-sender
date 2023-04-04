import { RequestHandler } from "express";

const loggerMiddleware: RequestHandler = (req, _res, next) => {
  if (req.originalUrl.includes("/health")) return next();
  console.log(`[${req.method}] ${req.originalUrl} :`);
  console.dir({ body: req.body }, { depth: null });
  return next();
};

export { loggerMiddleware };
