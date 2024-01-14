import { profile } from "../controllers/pages.controller.js";

import { Router } from "express";
const router = Router();

router.get("/profile", profile);

export default router;