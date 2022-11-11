import express from "express";
import { signUpMiddleware } from "../middlewares/auth.middleware.js";
import { registerNewUser } from "../controllers/auth.controller.js";

const router = express.Router();



router.post("/sign-up", signUpMiddleware, registerNewUser);
// router.post("/sign-in");

export default router;