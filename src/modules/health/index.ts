import { Router } from "express";
import responseToClient from "../../utils/response";
import { HttpCode } from "../../common/types/error.enum";

const router = Router();

router.get("/auth", (_req, res) => {
  return res.json(responseToClient({
    status: HttpCode.OK,
    message: "OK",
  }));
});

router.get("/mailer", (_req, res) => {
  return res.json(responseToClient({
    status: HttpCode.OK,
    message: "OK",
  }));
});

router.get("/", (_req, res) => {
  return res.json(responseToClient({
    status: HttpCode.OK,
    message: "OK",
  }));
});

export default router
