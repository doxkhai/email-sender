export class EmailDTO {
  receiver: string;
  subject: string;
  text: string;

  constructor(obj: { receiver: string; subject: string; text: string }) {
    this.receiver = obj.receiver;
    this.subject = obj.subject;
    this.text = obj.text;
  }
}
