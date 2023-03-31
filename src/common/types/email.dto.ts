import isEmail from "../validator/email.validator";
import isString from "../validator/string.validator";

export class EmailDTO {
  to: string;
  subject: string;
  text: string;

  constructor({
    receiver,
    subject,
    text,
  }: {
    receiver: string;
    subject: string;
    text: string;
  }) {
    this.to = isEmail(receiver);
    this.subject = isString(subject);
    this.text = isString(text);
  }
}
