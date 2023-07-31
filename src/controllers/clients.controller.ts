import { Request, Response } from "express";
import {
  TClient,
  TClientRequest,
  TListClient,
} from "../interfaces/clients.interface";
import {
  listClientsService,
  createClientService,
  deleteClientService,
  readClientsService,
  updateClientsService,
} from "../services/clients/clients.service";

const createClientController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const clientData: TClientRequest = request.body;

  const newClient: TClient = await createClientService(clientData);

  return response.status(201).json(newClient);
};

const listClientsController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const clients: TListClient = await listClientsService();

  return response.status(200).json(clients);
};

const readClientController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const idClient: number = parseInt(request.params.id);

  const client: TClient | null = await readClientsService(idClient);

  return response.json(client);
};

const updateClientController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const clientData: TClientRequest = request.body;
  const idClient: number = parseInt(request.params.id);
  const newClient: TClient = await updateClientsService(clientData, idClient);
  return response.json(newClient);
};

const deleteClientController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const idClient: number = parseInt(request.params.id);

  await deleteClientService(idClient);

  return response.status(204).json();
};

export {
  createClientController,
  listClientsController,
  readClientController,
  updateClientController,
  deleteClientController,
};
