import express from "express";

const app = express();
const port = 5000;

app.get("/", (_, res) => {
  res.send("Hello there");
});

app.listen(port, () => {
  console.log(`Listenin at port ${port}`);
});
