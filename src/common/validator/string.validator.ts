export default function isString(str: string | unknown) {
  if (typeof str === "string") return str;
  const err = new Error("Invalid string");
  err.name = "400";
  throw err;
}
