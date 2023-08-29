const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override")
const session = require("express-session")
const cookies = require("cookie-parser")
const PORT = 3030;

const mainRoutes = require("./routes/mainRoutes");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes")
const adminRoutes = require("./routes/adminRoutes");
const userLogged = require("./middlewares/userLoggedMiddleware");





//Middleware para express-session
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))

app.use(cookies())

//Middlewares
app.use(userLogged);





app.use(express.static(path.resolve(__dirname, "./public")));

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use("/", mainRoutes);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/admin", adminRoutes);

app.listen(PORT, () => console.log("Escuchando en http://localhost:" + PORT))

