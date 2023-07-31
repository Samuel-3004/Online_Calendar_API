import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import Client from "../entities/client.entity";

const ensureClientIdExistsMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const idClient: number = parseInt(request.params.id);

  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);
  const client: boolean = await clientRepository.exist({
    where: {
      id: idClient,
    },
  });

  if (!client) {
    return response.status(404).json({
      message: "Client not found",
    });
  }

  return next();
};

export default ensureClientIdExistsMiddleware;
