import { Router } from "express";
const router = Router();

import * as usersCtrl from "../controllers/user.controller";
import { authJwt, verifySignup } from "../middlewares";

router.post(
  "/",
  [
    verifySignup.checkDuplicateUsernameOrEmail,
  ],
  usersCtrl.createUser
);

export default router;
