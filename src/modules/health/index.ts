import { Router } from "express";

const router = Router();

router.get("/auth", (_req, res) => {
  return res.status(200).json({
    status: 200,
    message: "OK",
  });
});

router.get("/mailer", (_req, res) => {
  return res.status(200).json({
    status: 200,
    message: "OK",
  });
});

router.get("/", (_req, res) => {
  return res.status(200).json({
    status: 200,
    message: "OK",
  });
});

export default router
