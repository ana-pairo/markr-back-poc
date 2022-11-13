import express from "express";
import {
  signUpMiddleware,
  signInMiddleware,
  tokenAutentication,
} from "@middlewares/auth.middleware";
import {
  registerNewUser,
  logInUser,
  logOutUser,
} from "@controllers/auth.controller";

const router = express.Router();

router.post("/sign-up", signUpMiddleware, registerNewUser);
router.post("/sign-in", signInMiddleware, logInUser);
router.post("/sign-out", tokenAutentication, logOutUser);

export default router;
