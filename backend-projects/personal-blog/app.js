const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: true }));

const adminRoutes = require("./routes/admin");

app.use(express.static("public"));

app.use(adminRoutes);

app.listen(3002);
