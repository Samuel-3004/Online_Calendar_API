import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import Contact from "../entities/contact.entities";

const ensureContactIdExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const idContact: number = parseInt(request.params.id);

  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);
  const contact: boolean = await contactRepository.exist({
    where: {
      id: idContact,
    },
  });

  if (!contact) {
    return response.status(404).json({
      message: "Contact not found",
    });
  }

  return next();
};

export default ensureContactIdExistsMiddleware;
