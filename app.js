const express = require("express");
const app = express();
const path = require("path");
const PORT = 3030;

const mainRoutes = require("./routes/mainRoutes");

app.use(express.static(path.resolve(__dirname, "./public")));

app.set("view engine", "ejs");

app.use("/", mainRoutes);

app.listen(PORT, () => console.log("Escuchando en http://localhost:" + PORT))

