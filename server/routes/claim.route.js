import express from "express";
import {
  createClaim,
  getMyClaims,
  updateClaim,
  deleteClaim,
  updateClaimStatus,
  getClaimById,
} from "../controllers/claim.controller.js";
import { protect, adminOnly } from "../middlewares/auth.middleware.js";
import { uploadBoardingPass } from "../middlewares/upload.middleware.js";

const router = express.Router();

// USER
router.post("/", protect, uploadBoardingPass.array("boardingPasses", 10), createClaim);
router.get("/my", protect, getMyClaims);
router.put("/:id", protect, updateClaim);
router.delete("/:id", protect, deleteClaim);
router.get("/:id", protect, getClaimById); // ✅ ADD THIS



// ADMIN
router.patch("/:id/status", protect, adminOnly, updateClaimStatus);

export default router;

