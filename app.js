const express = require("express");
const app = express();
const path = require("path");
const PORT = 3030;

const mainRoutes = require("./routes/mainRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes")

app.use(express.static(path.resolve(__dirname, "./public")));

app.set("view engine", "ejs");

app.use("/", mainRoutes);
app.use("/auth", authRoutes);
app.use("/product", productRoutes);

app.listen(PORT, () => console.log("Escuchando en http://localhost:" + PORT))

