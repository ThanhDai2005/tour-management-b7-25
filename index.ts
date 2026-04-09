import express, { Express } from "express";
import dotenv from "dotenv";
import sequelize from "./config/database";
import moment from "moment";
import { adminRoutes } from "./routes/admin/index.route";
import { clientRoutes } from "./routes/client/index.route";
import { systemConfig } from "./config/system";
dotenv.config();

sequelize;

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.json());

app.use(express.static(`public`));

app.set("views", `./views`);
app.set("view engine", "pug");

// App Local Variables
app.locals.moment = moment;

app.locals.prefixAdmin = systemConfig.prefixAdmin;

adminRoutes(app);

clientRoutes(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
