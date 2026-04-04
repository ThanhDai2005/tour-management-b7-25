import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import connect from "./config/database";

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.set("views", `./views`);
app.set("view engine", "pug");

app.get("/tours", (req: Request, res: Response) => {
  res.render("client/pages/tours/index");
});

connect().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
