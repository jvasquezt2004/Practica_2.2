const express = require("express");
const dotenv = require("dotenv");
const { engine } = require("express-handlebars");
const path = require("path");
const { title } = require("process");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("home", { title: "Inicio" });
});

app.get("/error-test", (req, res, next) => {
  throw new Error(
    "Error intencional para probar si funciona el mensaje y la pagina de error 500"
  );
});

app.use((req, res, next) => {
  res.status(404).render("error404", { title: "404 - Pagina no encontrada" });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .render("error404", { title: "500 - Error interno del servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
