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

import formidable from "formidable";
import path from "path";
import fs from "fs";

router.post("/update-profile", async (req, res) => {
  if (!req.headers["content-type"]?.startsWith("multipart/form-data"))
    return res.status(422).json({ error: "Only accepts multipart/form-data" });

  const dir = path.join(__dirname, "../public/profiles");

  try {
    await fs.readdirSync(dir); // Cheack if dir exists
  } catch (error) {
    await fs.mkdirSync(dir); //if there is no dir, create this dir
  }

  // handle the file upload
  const form = formidable({
    uploadDir: dir,
    filename(name, ext, part, form) {
      return Date.now() + "_" + part.originalFilename;
    },
  });
  form.parse(req, (err, fields, files) => {
    console.log("fields: ", fields);
    console.log("files: ", files);

    res.json({ uploaded: true });
  });
});

export default router;
