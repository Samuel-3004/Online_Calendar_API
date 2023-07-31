import { z } from "zod";
import { loginSchema, responseLoginSchema } from "../schemas/session.schema";

type TSession = z.infer<typeof loginSchema>;

type TResponseSession = z.infer<typeof responseLoginSchema>

export { TSession, TResponseSession };
