const express = require("express");
const conectDB = require("./config/db");

const app = express();
conectDB();
app.use(express.json({ extended: true }));
const PORT = process.env.PORT || 4000;

app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));

app.listen(PORT, () => {
  console.log("Running on", PORT);
});
