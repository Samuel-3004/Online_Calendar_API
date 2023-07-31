import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import {
  TContactNoRelation,
  TContactRequest,
} from "../../interfaces/contacts.interface";
import Contact from "../../entities/contact.entities";
import {
  contactNoRelationSchema,
} from "../../schemas/contacts.schemas";
import Client from "../../entities/client.entity";
import { AppError } from "../../errors/errors";

const updateContactsService = async (
  dataContact: TContactRequest,
  idContact: number,
  idToken: number
): Promise<TContactNoRelation> => {
  
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const clientQueryBuilder = clientRepository.createQueryBuilder("client");

  const contactSearch = await clientQueryBuilder
    .leftJoinAndSelect("client.contacts", "contact", "contact.id = :idUrl", {
      idUrl: idContact,
    })
    .where("client.id = :idToken", { idToken: idToken })
    .getOne();

  if (contactSearch?.contacts.length === 0) {
    throw new AppError("Insufficient permission", 403);
  }

  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contact = contactSearch?.contacts[0];

  const newContact: Contact = contactRepository.create({
    ...contact,
    ...dataContact,
  });

  await contactRepository.save(newContact);

  const returnClient: TContactNoRelation =
    contactNoRelationSchema.parse(newContact);

  return returnClient;
};

export { updateContactsService };
