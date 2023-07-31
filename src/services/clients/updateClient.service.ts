import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TClient, TClientRequest } from "../../interfaces/clients.interface";
import Client from "../../entities/client.entity";
import { clientResponseSchema } from "../../schemas/clients.schemas";

const updateClientsService = async (
  dataClient: TClientRequest,
  idClient: number
): Promise<TClient> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const client: Client | null = await clientRepository.findOne({
    where: { id: idClient },
  });

  const newClient: Client = clientRepository.create({
    ...client,
    ...dataClient,
  });

  await clientRepository.save(newClient);

  const returnClient: TClient = clientResponseSchema.parse(newClient);

  return returnClient;
};

export { updateClientsService };
