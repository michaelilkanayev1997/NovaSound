import { Router } from "express";

import {
  toggleFavorite,
  getFavorites,
  getIsFavorite,
} from "#/controllers/favorite";
import { isVerified, mustAuth } from "#/middleware/auth";

const router = Router();

router.post("/", mustAuth, isVerified, toggleFavorite);
router.get("/", mustAuth, getFavorites);
router.get("/is-fav", mustAuth, getIsFavorite);

export default router;
