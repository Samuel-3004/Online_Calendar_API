import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/errors";

const ensureTokenValidMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> => {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new AppError("Missing bearer token", 401);
  }

  const token = authorization.split(" ")[1];

  jwt.verify(
    token,
    String(process.env.SECRET_KEY!),
    (err: any, decoded: any) => {
      if (err) {
        throw new AppError(err.message, 401);
      }
      response.locals.token = {
        id: decoded?.sub,
        email: decoded.email,
      };
      return next();
    }
  );
};

export { ensureTokenValidMiddleware };
