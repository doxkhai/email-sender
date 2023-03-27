export default function isString(str: string | unknown) {
  if (typeof str === "string") return str;
  throw new Error("Invalid string");
}
