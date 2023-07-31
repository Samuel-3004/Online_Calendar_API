import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import Client from "../../entities/client.entity";
import { TClientRequest, TClient } from "../../interfaces/clients.interface";
import { clientResponseSchema } from "../../schemas/clients.schemas";

const createClientService = async (
  clientData: TClientRequest
): Promise<TClient> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const client: TClientRequest = clientRepository.create({ ...clientData });

  await clientRepository.save(client);

  const newClient: TClient = clientResponseSchema.parse(client);

  return newClient;
};
export { createClientService };
