import { EmailDTO } from "../../common/types/email.dto";
import transporter from "./transporter";
import config from "@config";

function mailer(email: EmailDTO) {
  const mailOptions = {
    from: config.email.address,
    to: email.receiver,
    subject: email.subject,
    text: email.text,
  };

  return transporter.sendMail(mailOptions);
}

export { mailer };
