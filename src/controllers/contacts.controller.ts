import { Request, Response } from "express";
import {
  TContactNoRelation,
  TContactRequest,
  TContactResponse,
  TListContacts,
} from "../interfaces/contacts.interface";
import {
  createContactService,
  deleteContactService,
  listContactsService,
  readContactService,
  updateContactsService,
} from "../services/contacts/contacts.service";

const createContactController = async (
  request: Request,
  response: Response
): Promise<Response> => {

  const contactData: TContactRequest = request.body;

  const idTokenClient: number = parseInt(response.locals.token.id);
  
  const idClientUrl: number = parseInt(request.params.id);

  const newClient: TContactResponse = await createContactService(
    contactData,
    idTokenClient,
    idClientUrl
  );

  return response.status(201).json(newClient);
};

const listContactsController = async (
  request: Request,
  response: Response
): Promise<Response> => {

  const idTokenClient: number = parseInt(response.locals.token.id);

  const contacts: TListContacts = await listContactsService(idTokenClient);

  return response.status(200).json(contacts);
};

const readContactController = async (
  request: Request,
  response: Response
): Promise<Response> => {

  const idContact: number = parseInt(request.params.id);
  
  const idTokenClient: number = parseInt(response.locals.token.id);

  const contact: TContactNoRelation = await readContactService(idContact, idTokenClient);

  return response.json(contact);
};

const updateContactController = async (
  request: Request,
  response: Response
): Promise<Response> => {

  const contactData: TContactRequest = request.body;

  const idContact: number = parseInt(request.params.id);

  const idTokenClient: number = parseInt(response.locals.token.id);

  const newClient: TContactNoRelation = await updateContactsService(
    contactData,
    idContact,
    idTokenClient
  );

  return response.json(newClient);
};

const deleteContactController = async (
  request: Request,
  response: Response
): Promise<Response> => {

  const idContact: number = parseInt(request.params.id);

  const idTokenClient: number = parseInt(response.locals.token.id);
  
  await deleteContactService(idContact, idTokenClient);

  return response.status(204).json();
};

export {
  createContactController,
  listContactsController,
  readContactController,
  updateContactController,
  deleteContactController,
};
