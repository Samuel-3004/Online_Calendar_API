import { Repository } from "typeorm";
import Client from "../../entities/client.entity";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/errors";
import jwt from "jsonwebtoken";

const autoSessionService = async (idToken: number): Promise<any> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);


  const client: Client | null = await clientRepository.findOne({
    where: {
      id: idToken,
    },
    relations: {
      contacts: true
    }
  });

  if (!client) {
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
export { autoSessionService };
