const express = require("express");
const conectDB = require("./config/db")

const app = express();
conectDB();
const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {});

app.listen(PORT, () => {
  console.log("Running on", PORT);
});
