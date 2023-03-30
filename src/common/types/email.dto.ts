import isEmail from "../validator/email.validator";
import isString from "../validator/string.validator";

export class EmailDTO {
  receiver: string;
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
    this.receiver = isEmail(receiver);
    this.subject = isString(subject);
    this.text = isString(text);
  }
}
