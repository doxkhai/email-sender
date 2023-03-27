import { config } from "dotenv";
config();
import express from "express";
import mailerRouter from "./modules/mailer";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/mailer", mailerRouter);

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
