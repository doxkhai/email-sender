import { createTransport } from "nodemailer";
import config from "@config";

const transporter = createTransport({
  service: "gmail",
  auth: {
    user: config.email.address,
    pass: config.email.password,
  },
});

export default transporter;
