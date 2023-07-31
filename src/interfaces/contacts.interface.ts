import { z } from "zod";
import {
  contactClientSchema,
  contactNoRelationSchema,
  contactRequestSchema,
  contactResponseSchema,
  contactSchema,
  contactUpdateSchema,
  listContactsSchema,
} from "../schemas/contacts.schemas";

type TContact = z.infer<typeof contactSchema>;

type TContactRequest = z.infer<typeof contactRequestSchema>;

type TListContacts = z.infer<typeof listContactsSchema>;

type TContactResponse = z.infer<typeof contactResponseSchema>;

type TContactUpdate = z.infer<typeof contactUpdateSchema>;

type TContactClient = z.infer<typeof contactClientSchema>;

type TContactNoRelation = z.infer<typeof contactNoRelationSchema>;

export {
  TContact,
  TContactRequest,
  TContactResponse,
  TContactUpdate,
  TListContacts,
  TContactClient,
  TContactNoRelation
};
