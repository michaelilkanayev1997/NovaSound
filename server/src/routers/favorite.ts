import { Router } from "express";

import { toggleFavorite, getFavorites } from "#/controllers/favorite";
import { isVerified, mustAuth } from "#/middleware/auth";

const router = Router();

router.post("/", mustAuth, isVerified, toggleFavorite);
router.get("/", mustAuth, getFavorites);

export default router;
