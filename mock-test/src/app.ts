import express, { Express, Request, Response } from "express";
import cors from "cors";

const app: Express = express();

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api", (_req: Request, res: Response) => {
  res.status(200).send(process.env.MESSAGE || "AWS's Members");
});

export default app;
