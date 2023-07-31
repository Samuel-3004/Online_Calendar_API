import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import {
  TContactRequest,
  TContactResponse,
} from "../../interfaces/contacts.interface";
import Contact from "../../entities/contact.entities";
import { AppError } from "../../errors/errors";
import Client from "../../entities/client.entity";
import { clientResponseSchema } from "../../schemas/clients.schemas";

const createContactService = async (
  contactData: TContactRequest,
  idTokenClient: number,
  idClientUrl: number
): Promise<TContactResponse> => {
  if (idTokenClient !== idClientUrl) {
    throw new AppError("Insufficient permission", 403);
  }

  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const client: Client | any = await clientRepository.findOneBy({
    id: idTokenClient,
  });

  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const newContactData = {
    ...contactData,
    client: client,
  };
  
  const contact: Contact = contactRepository.create(newContactData);
  
  await contactRepository.save(contact);
  
  const clientSearch: TContactResponse = clientResponseSchema.parse(contact);

  return clientSearch;
};
export { createContactService };
