import config from "@config";
import { JwtPayload, sign, verify } from "jsonwebtoken";

const verifyJwt = (token: string, { secret = config.jwt.secret }) => {
  return verify(token, secret) as JwtPayload;
};

const signJwt = (
  payload: string | object | Buffer,
{ secret = config.jwt.secret, expires = config.jwt.expires }
) => {
  return sign(payload, secret, {
    expiresIn: expires,
  });
};

export { verifyJwt, signJwt };
