import { Router } from "express";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import { loginSchema } from "../schemas/session.schema";
import {
  autoSessionController,
  createSessionController,
} from "../controllers/index.controllers";
import { ensureTokenValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";

const loginRouter: Router = Router();

loginRouter.post(
  "",
  ensureBodyIsValidMiddleware(loginSchema),
  createSessionController
);

loginRouter.get("", ensureTokenValidMiddleware, autoSessionController);

export { loginRouter };
