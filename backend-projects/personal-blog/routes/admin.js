const path = require("path");

const express = require("express");
const { getArticles } = require("../models/articleModels");

const router = express.Router();

router.get("/admin", (req, res, next) => {
	console.log(getArticles());
	const articles = getArticles();
	console.log(articles);
	res.render("admin", {
		pageTitle: "Personal Blog - Admin",
		articles: articles,
	});
});

router.get("/edit-article", (req, res, next) => {
	res.sendFile(
		path.join(__dirname, "..", "views", "admin", "edit-article.html")
	);
});

router.get("/add-article", (req, res, next) => {
	res.sendFile(
		path.join(__dirname, "..", "views", "admin", "add-article.html")
	);
});

router.post("/add-article", (req, res, next) => {
	console.log(req.body);
	res.redirect("/admin");
});

module.exports = router;
