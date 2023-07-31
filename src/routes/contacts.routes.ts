import { Router } from "express";
import {
  contactRequestSchema,
  contactUpdateSchema,
} from "../schemas/contacts.schemas";
import ensureBodyIsValidMiddleware from "../middlewares/ensureBodyIsValid.middleware";
import {
  createContactController,
  deleteContactController,
  listContactsController,
  readContactController,
  updateContactController,
} from "../controllers/index.controllers";
import { ensureEmailContactAlreadyExists } from "../middlewares/ensureContactEmailExists.middleware";
import ensureContactIdExistsMiddleware from "../middlewares/ensureContactIdExists.middleware";
import { ensureTokenValidMiddleware } from "../middlewares/ensureTokenIsValid.middleware";
import { ensureClientTokenMiddleware } from "../middlewares/ensureClientToken.middleware";

const contactRouter: Router = Router();

contactRouter.post(
  "/:id",
  ensureTokenValidMiddleware,
  ensureClientTokenMiddleware,
  ensureBodyIsValidMiddleware(contactRequestSchema),
  ensureEmailContactAlreadyExists,
  createContactController
);

contactRouter.get("", ensureTokenValidMiddleware, listContactsController);

contactRouter.get(
  "/:id",
  ensureContactIdExistsMiddleware,
  ensureTokenValidMiddleware,
  readContactController
);

contactRouter.patch(
  "/:id",
  ensureBodyIsValidMiddleware(contactUpdateSchema),
  ensureContactIdExistsMiddleware,
  ensureTokenValidMiddleware,
  updateContactController
);

contactRouter.delete(
  "/:id",
  ensureContactIdExistsMiddleware,
  ensureTokenValidMiddleware,
  deleteContactController
);

export default contactRouter;
