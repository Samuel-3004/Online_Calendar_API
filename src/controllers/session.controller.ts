import { Request, Response } from "express";
import { TSession } from "../interfaces/session.interface";
import { createSessionService } from "../services/sessions/session.service";
import { autoSessionService } from "../services/sessions/autoSession.service";

const createSessionController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  
  const dataSession: TSession = request.body;

  const token = await createSessionService(dataSession);

  return response.status(200).json(token);
};

const autoSessionController = async (
  request: Request,
  response: Response
): Promise<Response> => {
  const idTokenClient: number = parseInt(response.locals.token.id);
  const token = await autoSessionService(idTokenClient);

  return response.status(200).json(token);
};
export { createSessionController, autoSessionController };
