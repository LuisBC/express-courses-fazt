const express = require("express");
const morgan = require("morgan");

const app = express();

const ProductsRoutes = require("./routes/products");

// Settings
app.set("case sensitive routing", true);
app.set("appName", "Express Course");
app.set("port", 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use(ProductsRoutes);

app.listen(app.get("port"));
console.log(`Server ${app.get("appName")} running on port ${app.get("port")}`);
