import { NextFunction, Request, Response } from "express";
import Client from "../entities/client.entity";
import { AppDataSource } from "../data-source";

const ensureEmailClientAlreadyExists = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<Response | void> => {
  const email: string = request.body.email;

  const clientRepository = AppDataSource.getRepository(Client);

  const findUserEmail: boolean = await clientRepository.exist({
    where: {
      email: email,
    },
  });

  if (findUserEmail) {
    return response.status(409).json({
      message: "Email already exists",
    });
  }
  return next();
};
export { ensureEmailClientAlreadyExists };
