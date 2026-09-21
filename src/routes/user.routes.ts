import { Router } from "express";

import {
  getPendingRequestsController,
  getUserConnectionsController,
} from "../controllers/connection-request.controller.js";

import { getFeed } from "../controllers/feed.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/feed", requireAuth, getFeed);

userRouter.get("/requests/received", requireAuth, getPendingRequestsController);

userRouter.get("/connections", requireAuth, getUserConnectionsController);

export default userRouter;
