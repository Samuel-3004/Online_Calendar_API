import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";
import express, { Application } from "express";
import clientRouter from "./routes/clients.routes";
import { erroHandler } from "./errors/errors";
import contactRouter from "./routes/contacts.routes";
import { loginRouter } from "./routes/session.routes";
const cors = require('cors');

const app: Application = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/client", clientRouter);
app.use("/contact", contactRouter);
app.use("/session", loginRouter);

app.use(express.static("documentation"))

app.use(erroHandler);

export default app;
