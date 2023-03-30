import config from "@config";
import { JwtPayload, sign, verify } from "jsonwebtoken";

const verifyJwt = (token: string) => {
  return verify(token, config.jwt.secret) as JwtPayload;
};

const signJwt = (payload: string | object | Buffer) => {
  return sign(payload, config.jwt.secret, {
    expiresIn: config.jwt.expires,
  });
}

export { verifyJwt, signJwt };
