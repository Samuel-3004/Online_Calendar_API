import { NextFunction, Request, Response } from "express";
import { AppDataSource } from "../data-source";
import Contact from "../entities/contact.entities";
import Client from "../entities/client.entity";
import { Repository } from "typeorm";

const ensureEmailContactAlreadyExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const email: string = request.body.email;
  const idTokenClient: number = parseInt(response.locals.token.id);

  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const clientQueryBuilder = clientRepository.createQueryBuilder("client");

  const contactSearch = await clientQueryBuilder
    .leftJoinAndSelect(
      "client.contacts",
      "contact",
      "contact.email = :emailContact",
      {
        emailContact: email,
      }
    )
    .where("client.id = :idToken", { idToken: idTokenClient })
    .getOne();


  if(contactSearch?.contacts.length !== 0){
    return response.status(409).json({
      message: "Email already exists",
    });
  }

  return next();
};
export { ensureEmailContactAlreadyExists };
