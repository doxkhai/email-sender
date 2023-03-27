import { EmailDTO } from "../../types/email.dto";
import transporter from "./transporter";

export default function mailer(email: EmailDTO) {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email.receiver,
    subject: email.subject,
    text: email.text,
  };

  return transporter.sendMail(mailOptions);
}
