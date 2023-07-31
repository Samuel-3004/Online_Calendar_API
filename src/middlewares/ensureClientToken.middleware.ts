import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/errors";

const ensureClientTokenMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
    
  const idClientUrl: number = parseInt(request.params.id);

  const idTokenClient: number = parseInt(response.locals.token.id);

  if (idTokenClient !== idClientUrl) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};

export { ensureClientTokenMiddleware };
