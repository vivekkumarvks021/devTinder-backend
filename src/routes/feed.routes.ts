import { Router } from "express";

import { getFeed } from "../controllers/feed.controller.js";

import { requireAuth } from "../middlewares/auth.middleware.js";

const feedRouter = Router();

feedRouter.get("/feed", requireAuth, getFeed);

export default feedRouter;
