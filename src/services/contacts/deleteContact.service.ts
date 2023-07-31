import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import Contact from "../../entities/contact.entities";
import Client from "../../entities/client.entity";
import { AppError } from "../../errors/errors";

const deleteContactService = async (
  idContact: number,
  idTokenClient: number
): Promise<void> => {
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
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  await contactRepository.delete({ id: idContact });
};

export { deleteContactService };
