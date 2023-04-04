import { ErrorRequestHandler, RequestHandler } from "express";
import responseToClient from "../../utils/response";
import AppError from "../../utils/appError";
import { HttpCode } from "../types/error.enum";

const notFoundHandler: RequestHandler = (_req, _res, next) => {
    return next(AppError('Not found', HttpCode.NOT_FOUND));
};

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err)
  if (res.headersSent) {
    return next(err);
  }

  let status = Number(isNaN(err.code) ? HttpCode.INTERNAL : err.code);
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
