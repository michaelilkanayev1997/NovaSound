import { Router } from "express";

import { toggleFavorite } from "#/controllers/favorite";
import { isVerified, mustAuth } from "#/middleware/auth";

const router = Router();

router.post("/", mustAuth, isVerified, toggleFavorite);

export default router;
