import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import {
  TContactNoRelation,
} from "../../interfaces/contacts.interface";
import { contactNoRelationSchema } from "../../schemas/contacts.schemas";
import Client from "../../entities/client.entity";
import { AppError } from "../../errors/errors";

const readContactService = async (
  idContact: number,
  idTokenClient: number
): Promise<TContactNoRelation> => {
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const clientQueryBuilder = clientRepository.createQueryBuilder("client");

  const contactSearch = await clientQueryBuilder
    .leftJoinAndSelect("client.contacts", "contact", "contact.id = :idUrl", {
      idUrl: idContact,
    })
    .where("client.id = :idToken", { idToken: idTokenClient })
    .getOne();

  if (contactSearch?.contacts.length === 0) {
    throw new AppError("Insufficient permission", 403);
  }

  const contact = contactSearch?.contacts[0];

  const clientSearch: TContactNoRelation = contactNoRelationSchema.parse(contact);

  return clientSearch;
};

export { readContactService };
