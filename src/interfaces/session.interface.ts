import { z } from "zod";
import { loginSchema, responseLoginSchema } from "../schemas/session.schema";
import { sessionAccessSchema } from "../schemas/clients.schemas";

type TSession = z.infer<typeof loginSchema>;

type TResponseSession = z.infer<typeof sessionAccessSchema>

export { TSession, TResponseSession };
