import { ErrorRequestHandler, RequestHandler } from "express";
import responseToClient from "../../utils/response";

const notFoundHandler: RequestHandler = (_req, _res, next) => {
    const err = new Error('Not found')
    err.name = '404';
    return next(err);
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  let status = Number(isNaN(err.name) ? 500 : err.name);
  let message = err.message ?? "Internal server error";

  return res.status(status).json(
    responseToClient({
      status,
      message,
      path: req.originalUrl,
    })
  );
};

export { errorHandler, notFoundHandler };
