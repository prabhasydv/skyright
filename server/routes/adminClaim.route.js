import express from "express";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import {
  getAllClaims,
  updateClaimStatus,
} from "../controllers/claim.controller.js";

const router = express.Router();

router.get("/", protect, adminOnly, getAllClaims);
router.patch("/:id/status", protect, adminOnly, updateClaimStatus);

export default router;
