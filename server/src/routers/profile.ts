import {
  updateFollower,
  getUploads,
  getPublicUploads,
} from "#/controllers/profile";
import { mustAuth } from "#/middleware/auth";
import { Router } from "express";

const router = Router();

router.post("/update-follower/:profileId", mustAuth, updateFollower);
router.get("/uploads", mustAuth, getUploads);
router.get("/uploads/:profileId", getPublicUploads);

export default router;
