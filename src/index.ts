import { config } from "dotenv";
config();
import express from "express";
import mailerRouter from "./modules/mailer";
import authRouter from "./modules/auth"
import env from "@config";

import { connect } from "./config/db";
connect()

const app = express();
const PORT = env.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRouter);
app.use("/mailer", mailerRouter);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
