const { Router } = require("express");

const router = Router();

let products = [{ id: 1, name: "skate" }];

router.get("/products", (req, res) => {
  res.json(products);
});

router.get("/products/:id", (req, res) => {
  const productFound = products.find((p) => p.id === parseInt(req.params.id));
  productFound
    ? res.json(productFound)
    : res.status(404).json({ message: "Product not found" });
});

router.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    ...req.body,
  };
  products.push(newProduct);
  res.json(newProduct);
});

router.put("/products/:id", (req, res) => {
  const newData = req.body;

  const productFound = products.find((p) => p.id === parseInt(req.params.id));
  if (!productFound)
    return res.status(404).json({ message: "Product not found" });
  products = products.map((p) =>
    p.id === parseInt(req.params.id) ? { ...p, ...newData } : p
  );
  res.json({ message: "Product updated successfully" });
});

router.delete("/products/:id", (req, res) => {
  const productFound = products.find((p) => p.id === parseInt(req.params.id));
  productFound
    ? res.sendStatus(204)
    : res.status(404).json({ message: "Product not found" });
  products = products.filter((p) => p.id !== parseInt(req.params.id));
});

module.exports = router;
