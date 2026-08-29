import { Router } from "express";

import { editProfile, viewProfile } from "../controllers/profile.controller.js";

import { requireAuth } from "../middlewares/auth.middleware.js";

import { validate } from "../middlewares/validate.middleware.js";

import { updateProfileSchema } from "../validations/profile.validation.js";

const profileRouter = Router();

profileRouter.get("/view", requireAuth, viewProfile);

profileRouter.patch(
  "/edit",
  requireAuth,
  validate(updateProfileSchema),
  editProfile,
);

export default profileRouter;
