import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";

class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super();
    (this.message = message), (this.statusCode = statusCode);
  }
}

const erroHandler = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      message: err.message,
    });
  }
  if (err instanceof ZodError) {
    return response.status(400).json({
      message: err.flatten().fieldErrors,
    });
  }
  console.log(err);
  return response.status(500).json({ message: "Internal Server Error." });
};

export { AppError, erroHandler };
