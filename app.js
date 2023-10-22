const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override")
const session = require("express-session")
const cookies = require("cookie-parser")
const PORT = 3030;

const mainRoutes = require("./routes/ProductRoutes/mainRoutes");
const authRoutes = require("./routes/UserRoutes/authRoutes");
const productRoutes = require("./routes/ProductRoutes/productRoutes")
const adminRoutes = require("./routes/ProductRoutes/adminRoutes");
const adminUserRoutes = require("./routes/UserRoutes/adminUserRoutes")
const apiRoutes = require("./routes/ApiRoutes/api")
const userLogged = require("./middlewares/userLoggedMiddleware");
const db = require("./database/models");
const { Console } = require("console");



app.use(express.static(path.resolve(__dirname, "./public")));

//Middleware para express-session
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))

app.use(cookies())

//Middlewares
app.use(userLogged);


// db.User.findByPk(5, {
//     include: db.Role,
//     raw: true
// })
//     .then((pelicula) => console.log(pelicula));

// db.Role.findByPk(1, {
//     include: db.User,
//     raw: true
// })
//     .then((rol) => console.log(rol))

// db.Product.findAll()
//     .then((producto) => console.log(producto))

// db.Category.findByPk(1, {
//     include: db.Product,
//     raw: true
// })
// .then((categoria) => console.log(categoria))

// db.Product.findByPk(1, {
//     include: db.Category,
//     raw: true
// })
//     .then((categoria) => console.log(categoria))

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use("/", mainRoutes);
app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/admin", adminRoutes);
app.use("/adminUsers", adminUserRoutes);
app.use("/api", apiRoutes)

app.listen(PORT, () => console.log("Escuchando en http://localhost:" + PORT))

