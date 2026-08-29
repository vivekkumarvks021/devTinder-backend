import { Router } from "express";

import {
  reviewRequest,
  sendRequest,
} from "../controllers/connection-request.controller.js";

import { requireAuth } from "../middlewares/auth.middleware.js";

import { validate } from "../middlewares/validate.middleware.js";

import {
  reviewConnectionRequestParamsSchema,
  sendConnectionRequestParamsSchema,
} from "../validations/connection-request.validation.js";

const connectionRequestRouter = Router();

connectionRequestRouter.post(
  "/send/:status/:toUserId",
  requireAuth,
  validate(sendConnectionRequestParamsSchema, "params"),
  sendRequest,
);

connectionRequestRouter.post(
  "/review/:status/:requestId",
  requireAuth,
  validate(reviewConnectionRequestParamsSchema, "params"),
  reviewRequest,
);

export default connectionRequestRouter;
