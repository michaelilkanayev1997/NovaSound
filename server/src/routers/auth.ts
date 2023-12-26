import { Router } from "express";
import { JwtPayload, verify } from "jsonwebtoken";

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
import { isValidPassResetToken } from "#/middleware/auth";
import { JWT_SECRET } from "#/utils/variables";
import User from "#/models/user";

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
router.get("/is-auth", async (req, res) => {
  const { authorization } = req.headers;
  const token = authorization?.split("Bearer ")[1];

  if (!token) return res.status(403).json({ error: "Unauthorized request" });

  const payload = verify(token, JWT_SECRET) as JwtPayload;
  const id = payload.userId;

  const user = await User.findById(id);
  if (!user) return res.status(403).json({ error: "Unauthorized request" });

  res.json({
    profile: {
      id: user._id,
      name: user.name,
      email: user.email,
      verified: user.verified,
      avatar: user.avatar?.url,
      followers: user.followers.length,
      followings: user.followings.length,
    },
  });
});

export default router;
