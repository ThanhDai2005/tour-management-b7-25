import express, { Express, Request, Response } from "express";
const app: Express = express();
const port: Number = 3000;

app.get("/tours", (req: Request, res: Response) => {
  res.send("Danh sách tours");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
