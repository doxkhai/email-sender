export default function isEmail(email: string | unknown) {
  if (typeof email === "string") {
    const emailRegex = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (emailRegex.test(email)) return email;
  }
  throw new Error("Wrong email format");
}
