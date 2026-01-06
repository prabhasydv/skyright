import express from "express";
import {
  getSigningData,
  submitSignature,
} from "../controllers/sign.controller.js";

const router = express.Router();

router.get("/:token", getSigningData);
router.post("/:token", submitSignature);

export default router;
