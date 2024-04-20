import { Router } from "express";

const router = Router();

router.get("/healthcheck", function(req, res) {
  res.status(200).json({
    uptime: Date.now(),
    message: "Successfully connected",
  });
});

export default router;