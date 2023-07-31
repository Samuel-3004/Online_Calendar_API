import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import Client from "../../entities/client.entity";

const deleteClientService = async (idClient: number): Promise<void> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  await clientRepository.delete({ id: idClient });
};

export { deleteClientService };
