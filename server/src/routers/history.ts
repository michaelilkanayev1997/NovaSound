import { updateHistory } from "#/controllers/history";
import { mustAuth } from "#/middleware/auth";
import { Router } from "express";

const router = Router();

router.post("/", mustAuth, updateHistory);

export default router;
