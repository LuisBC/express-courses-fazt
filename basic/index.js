const express = require("express");
const morgan = require("morgan");
const path = require("path");

const app = express();

// Static Files
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Third Party Middlewares
app.use(morgan("dev")); // Logger Middleware

// Routes
app.get("/", (req, res) => {
  res.send("Main Page");
});

app.get("/products", (req, res) => {
  res.send("Products List");
});

app.post("/products", (req, res) => {
  console.log(req.body);
  res.send("Create Product");
});

app.put("/products", (req, res) => {
  res.send("Update Product");
});

app.patch("/products", (req, res) => {
  res.send("Update Product Part");
});

app.delete("/products", (req, res) => {
  res.send("Delete Product");
});

app.all("/products", (req, res) => {
  // All routes in once (get, post, put...)
  res.send("All routes valid to Product");
});

// Is Alive
app.get("/isAlive", (req, res) => {
  res.sendStatus(204);
});

// Send Files
app.get("/html", (req, res) => {
  res.sendFile("/static/index.html", {
    root: __dirname,
  });
});

app.get("/image", (req, res) => {
  res.sendFile("/javascript.png", {
    root: __dirname,
  });
});

// Send JSON
app.get("/json", (req, res) => {
  res.json({
    name: "luis",
    lastName: "barriga",
    age: 26,
    points: [1, 2, 3],
    address: { city: "Huelva", country: "Spain" },
  });
});

// Request Body
app.use(express.text()); // Middleware
app.use(express.json()); // Middleware
app.use(express.urlencoded({ extended: false })); // Middleware

app.post("/reqBody", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// Request Params
app.get("/reqParams/:name/:surname", (req, res) => {
  console.log(req.params);
  res.send(req.params);
});

app.get("/reqParamsPhoto/:name/photo", (req, res) => {
  if (req.params.name === "luis") {
    return res.sendFile("./javascript.png", {
      root: __dirname,
    });
  }
  res.send("User without permissions");
});

// Request Queries
app.get("/reqQueries", (req, res) => {
  // If several queries with same name are send, it save into an array
  console.log(req.query);
  res.send(req.query);
});

// Middlewares
app.use((req, res, next) => {
  console.log("Executing middleware before middleware request");
  next();
});

app.get("/middleware", (req, res) => {
  console.log("Middleware was executed");
  res.send("Middleware was executed");
});

app.use((req, res, next) => {
  if (req.query.email === "luisbarrigacarrasco@gmail.com") {
    next();
  } else {
    res.send("User not authenticated");
  }
});

app.get("/login", (req, res) => {
  res.send("User logged successfully");
});

// Route Not Found
app.use((req, res) => {
  res.status(400).send("Page not found");
});

// App Listen
app.listen(3000);
console.log(`Server on port ${3000}`);
