import { Router } from "express";

import { signup } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { signupSchema } from "../validations/auth.validation.js";

const authRouter = Router();

authRouter.post("/signup", validate(signupSchema), signup);

export default authRouter;
