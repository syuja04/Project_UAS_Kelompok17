const express = require("express");
const bodyParser = require("body-parser");
const { application } = require("express");
const port = 3000;

const app = express();

//parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Memanggil routes
app.get("/", (req, res) => {
  res.json({ message: "hai" });
});

app.listen(port, () => {
  console.log(`Server Berjalan di http://localhost:${port}`);
});
