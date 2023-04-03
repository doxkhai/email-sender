import { config } from "dotenv";
config();

import env from "@config";
import { configValidator } from "./common/validator/config.validator";
if (!configValidator(env)) throw new Error("Config validation failed");

import express from "express";
import cors from "cors";
import mailerRouter from "./modules/mailer";
import authRouter from "./modules/auth";
import healthRouter from "./modules/health";

import { connect } from "./config/db";
import { loggerMiddleware } from "./common/middleware/logger";
import {
  errorHandler,
  notFoundHandler,
} from "./common/middleware/errorHandler";
connect();

const app = express();
const PORT = env.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(loggerMiddleware);

app.use("/auth", authRouter);
app.use("/mailer", mailerRouter);
app.use("/health", healthRouter);
app.use("*", notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
