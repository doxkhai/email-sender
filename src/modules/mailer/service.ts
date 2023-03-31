import { EmailDTO } from "../../common/types/email.dto";
import transporter from "./transporter";
import config from "@config";
import { signJwt } from "../../utils/jwt";
import { mailerForm } from "../../utils/mailerForm";
import Mail from "nodemailer/lib/mailer";

function mailer(option: Mail.Options) {
  const mailOptions = {
    ...option,
    from: config.email.address
  };

  return transporter.sendMail(mailOptions);
}

function sendMail(option: EmailDTO, host: string) {
  const unsubscribeJwt = signJwt({email: option.to})
  const html = mailerForm(option.text, unsubscribeJwt, host)
  console.log({html})
  return mailer({
    ...option,
    html,
  })
}

export { mailer, sendMail };
