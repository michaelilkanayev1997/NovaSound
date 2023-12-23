import { Router } from "express";

import {
  create,
  sendReVerificationToken,
  verifyEmail,
} from "#/controllers/user";
import { validate } from "#/middleware/validator";
import {
  CreateUserSchema,
  EmailVerificationBody,
} from "#/utils/validationSchema";

const router = Router();

router.post("/create", validate(CreateUserSchema), create);
router.post("/verify-email", validate(EmailVerificationBody), verifyEmail);
router.post("/re-verify-email", sendReVerificationToken);

export default router;
