import express from "express";
import { signUpMiddleware, signInMiddleware } from "../middlewares/auth.middleware.js";
import { registerNewUser, logInUser } from "../controllers/auth.controller.js";

const router = express.Router();



router.post("/sign-up", signUpMiddleware, registerNewUser);
router.post("/sign-in", signInMiddleware, logInUser);
router.post("sign-out");

export default router;