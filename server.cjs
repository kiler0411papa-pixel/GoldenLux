const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 4000;
const DATA_FILE = "products.json";

app.use(bodyParser.json());
app.use(cors());

if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

app.get("/all_products", (req, res) => {
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  res.json(data);
});

app.post("/add_product", (req, res) => {
  const newProduct = req.body;
  const data = JSON.parse(fs.readFileSync(DATA_FILE));
  data.push(newProduct);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data));
  res.status(201).json(newProduct);
});

app.delete("/delete_product/:id", (req, res) => {
  const id = Number(req.params.id);
  let data = JSON.parse(fs.readFileSync(DATA_FILE));
  data = data.filter((p) => p.id !== id);
  fs.writeFileSync(DATA_FILE, JSON.stringify(data));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
