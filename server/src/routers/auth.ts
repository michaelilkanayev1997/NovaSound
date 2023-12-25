import { Router } from "express";

import {
  create,
  sendReVerificationToken,
  verifyEmail,
  generateForgetPasswordLink,
  grantValid,
} from "#/controllers/user";
import { validate } from "#/middleware/validator";
import {
  CreateUserSchema,
  TokenAndIdValidation,
} from "#/utils/validationSchema";
import { isValidPassResetToken } from "#/middleware/auth";

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

export default router;
