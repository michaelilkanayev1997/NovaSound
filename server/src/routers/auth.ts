import { Router } from "express";

import {
  create,
  sendReVerificationToken,
  verifyEmail,
  generateForgetPasswordLink,
  grantValid,
  updatePassword,
  signIn,
} from "#/controllers/user";
import { validate } from "#/middleware/validator";
import {
  CreateUserSchema,
  SignInValidationSchema,
  TokenAndIdValidation,
  UpdatePasswordSchema,
} from "#/utils/validationSchema";
import { isValidPassResetToken, mustAuth } from "#/middleware/auth";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);
router.post("/verify-email", validate(TokenAndIdValidation), verifyEmail);
router.post("/re-verify-email", sendReVerificationToken);
router.post("/forget-password", generateForgetPasswordLink);
router.post(
  "/verify-pass-reset-token",
  validate(TokenAndIdValidation),
  isValidPassResetToken,
  grantValid
);
router.post(
  "/update-password",
  validate(UpdatePasswordSchema),
  isValidPassResetToken,
  updatePassword
);
router.post("/sign-in", validate(SignInValidationSchema), signIn);
router.get("/is-auth", mustAuth, (req, res) => {
  res.json({ profile: req.user });
});

export default router;
