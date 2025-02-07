const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.set("views", ["views", "views/admin", "views/blog"]);

app.use(bodyParser.urlencoded({ extended: true }));

const blogRoutes = require("./routes/blog");
const adminRoutes = require("./routes/admin");

app.use(express.static("public"));

app.use(adminRoutes);
app.use(blogRoutes);

app.listen(3002);
