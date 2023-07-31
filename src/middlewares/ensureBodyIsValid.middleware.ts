import { Request, Response, NextFunction } from "express";
import { ZodTypeAny } from "zod";

const ensureBodyIsValidMiddleware =
  (schema: ZodTypeAny) =>
  (
    request: Request,
    response: Response,
    next: NextFunction
  ): Response | void => {
    const data = schema.parse(request.body);
    request.body = data;
    return next();
  };
export default ensureBodyIsValidMiddleware;
