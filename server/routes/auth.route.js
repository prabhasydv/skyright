import express from "express";
import { signup, login, logout, googleAuth } from "../controllers/auth.controller.js";

const router = express.Router();

// SIGNUP
router.post("/signup", signup);

// LOGIN
router.post("/login", login);
router.post("/logout", logout);

router.post("/google", googleAuth);


export default router;
