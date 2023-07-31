import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TListClient } from "../../interfaces/clients.interface";
import Client from "../../entities/client.entity";
import { listClientsSchema } from "../../schemas/clients.schemas";

const listClientsService = async (): Promise<TListClient> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const clients: Client[] = await clientRepository.find();

  const returnClients: TListClient = listClientsSchema.parse(clients);

  return returnClients;
};

export { listClientsService };
