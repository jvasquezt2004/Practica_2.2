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

app.use((req, res) => {
  res.status(404).render("error404", { title: "Error 404" });
});
app.use((req, res) => {
  res.status(500).render("error404", { title: "Error 500" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
