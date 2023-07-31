import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { TListContacts } from "../../interfaces/contacts.interface";
import { listContactsSchema } from "../../schemas/contacts.schemas";
import Client from "../../entities/client.entity";

const listContactsService = async (idToken: number): Promise<TListContacts> => {

  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const client: Client | null = await clientRepository.findOne({
    where: {
      id: idToken,
    },
    relations: {
      contacts: true,
    },
  });
  
  const contacts = client?.contacts;

  const returnContacts: TListContacts = listContactsSchema.parse(contacts);

  return returnContacts;
};

export { listContactsService };
