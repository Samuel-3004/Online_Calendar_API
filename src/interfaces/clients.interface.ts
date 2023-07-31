import { z } from "zod";
import {
  clientRequestSchema,
  listClientsSchema,
  clientUpdateSchema,
  clientContactsSchema,
  clientResponseSchema,
} from "../schemas/clients.schemas";

type TClient = z.infer<typeof clientResponseSchema>;

type TClientRequest = z.infer<typeof clientRequestSchema>;

type TListClient = z.infer<typeof listClientsSchema>;

type TClientUpdate = z.infer<typeof clientUpdateSchema>;

type TClientContactsResponse = z.infer<typeof clientContactsSchema>;//token

export {
  TClient,
  TClientRequest,
  TListClient,
  TClientUpdate,
  TClientContactsResponse,
};
