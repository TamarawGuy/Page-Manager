// packages
const express = require("express");
const bodyParser = require("body-parser");
const { pool } = require("./db");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// admin controllers
const {
  getAllPages,
  createPage,
  deletePage,
} = require("./controllers/admin/adminControllers");

// login controllers
const { getLogin, postLogin } = require("./controllers/login/loginControllers");

// pages controllers
const { getPage } = require("./controllers/pages/pageControllers");

// middlewares
const {
  checkForCookieMiddleware,
} = require("./middlewares/checkForCookieMiddleware");

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

const PASSWORD = process.env.PASSWORD;

app.get("/", checkForCookieMiddleware, (req, res) => {
  return res.redirect("/admin");
});

app.get("/login", getLogin);

app.post("/login", postLogin);

app.get("/admin", checkForCookieMiddleware, getAllPages);

app.post("/admin", createPage);

app.get("/:url_slug", getPage);

app.delete("/admin/:url_slug", deletePage);

app.listen(process.env.PORT, () => console.log("App listening on port 3000"));
