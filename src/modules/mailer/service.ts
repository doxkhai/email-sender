import { EmailDTO } from "../../common/types/email.dto";
import transporter from "./transporter";
import config from "@config";
import { signJwt } from "../../utils/jwt";
import { mailerForm } from "../../utils/mailerForm";
import Mail from "nodemailer/lib/mailer";

function mailer(option: Mail.Options) {
  const mailOptions = {
    ...option,
    from: config.email.address,
  };

  return transporter.sendMail(mailOptions);
}

function sendMail(option: EmailDTO) {
  const unsubscribeJwt = signJwt(
    { email: option.to },
    { expires: config.jwt.expiresUnsubscribe }
  );
  const html = mailerForm(option.text, unsubscribeJwt);
  return mailer({
    ...option,
    html,
  });
}

export { mailer, sendMail };
