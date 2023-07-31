import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TClient } from "../../interfaces/clients.interface";
import Client from "../../entities/client.entity";
import { clientResponseSchema } from "../../schemas/clients.schemas";

const readClientsService = async (
  idClient: number
): Promise<TClient | null> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const client: Client | null = await clientRepository.findOne({
    where: { id: idClient },
  });

  const returnClient: TClient = clientResponseSchema.parse(client);

  return returnClient;
};

export { readClientsService };
