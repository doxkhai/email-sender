import AppError from "../../utils/appError";
import { HttpCode } from "../types/error.enum";

export default function isString(str: string | unknown) {
  if (typeof str === "string") return str;
  throw AppError("Invalid string", HttpCode.BAD_REQUEST);
}
