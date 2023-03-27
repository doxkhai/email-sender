import isEmail from "../common/validator/email.validator";
import isString from "../common/validator/string.validator";

export class EmailDTO {
  receiver: string;
  subject: string;
  text: string;

  constructor(obj: { receiver: string; subject: string; text: string }) {
    this.receiver = isEmail(obj.receiver);
    this.subject = isString(obj.subject);
    this.text = isString(obj.text);
  }
}
