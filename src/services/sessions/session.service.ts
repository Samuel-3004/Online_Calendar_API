import { Repository } from "typeorm";
import { TSession } from "../../interfaces/session.interface";
import Client from "../../entities/client.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/errors";
import { compare } from "bcryptjs";
import jwt from "jsonwebtoken";

const createSessionService = async (sessionData: TSession): Promise<any> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const client: Client | null = await clientRepository.findOne({
    where: {
      email: sessionData.email,
    },
    relations: {
      contacts: true,
    },
  });

  if (!client) {
    throw new AppError("Invalid credentials", 401);
  }

  const passwordMatch = await compare(sessionData.password, client.password);

  if (!passwordMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  const token = jwt.sign(
    {
      email: client.email,
    },
    String(process.env.SECRET_KEY),
    {
      subject: String(client.id),
      expiresIn: String(process.env.EXPIRES_IN),
    }
  );

  const dataComplete = {
    token: token,
    user: client,
  };

  return dataComplete;
};
export { createSessionService };
