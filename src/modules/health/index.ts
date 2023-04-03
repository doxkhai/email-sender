import { Router } from "express";
import responseToClient from "../../utils/response";

const router = Router();

router.get("/auth", (_req, res) => {
  return res.json(responseToClient({
    status: 200,
    message: "OK",
  }));
});

router.get("/mailer", (_req, res) => {
  return res.json(responseToClient({
    status: 200,
    message: "OK",
  }));
});

router.get("/", (_req, res) => {
  return res.json(responseToClient({
    status: 200,
    message: "OK",
  }));
});

export default router
