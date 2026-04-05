import express, { Express } from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";
import { clientRoutes } from "./routes/client/index.route";
dotenv.config();

sequelize;

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.set("views", `./views`);
app.set("view engine", "pug");

clientRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
