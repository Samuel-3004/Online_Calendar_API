import { Router } from "express";
import {
  createClientController,
  deleteClientController,
  listClientsController,
  readClientController,
  updateClientController,
} from "../controllers/index.controllers";
import { ensureEmailClientAlreadyExists } from "../middlewares/ensureClientEmailExists.middleware";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import {
  clientRequestSchema,
  clientUpdateSchema,
} from "../schemas/clients.schemas";
import ensureClientIdExistsMiddleware from "../middlewares/ensureClientIdExists.middleware";
import { ensureTokenValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureClientTokenMiddleware } from "../middlewares/ensureClientToken.middleware";

const clientRouter: Router = Router();

clientRouter.post(
  "",
  ensureBodyIsValidMiddleware(clientRequestSchema),
  ensureEmailClientAlreadyExists,
  createClientController
);

clientRouter.get("", ensureTokenValidMiddleware, listClientsController);

clientRouter.get("/:id", ensureTokenValidMiddleware, ensureClientTokenMiddleware, ensureClientIdExistsMiddleware, readClientController);

clientRouter.patch(
  "/:id",
  ensureTokenValidMiddleware,
  ensureClientTokenMiddleware,
  ensureBodyIsValidMiddleware(clientUpdateSchema),
  ensureClientIdExistsMiddleware,
  updateClientController
);

clientRouter.delete(
  "/:id",
  ensureTokenValidMiddleware,
  ensureClientTokenMiddleware,
  ensureClientIdExistsMiddleware,
  deleteClientController
);

export default clientRouter;
