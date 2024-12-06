const { Article } = require("../models/article");

const { getFormattedDateForInput } = require("../utils/dateHelper");

exports.getAdminArticles = (req, res, next) => {
	const articles = Article.fetchArticles();
	res.render("admin", {
		pageTitle: "Personal Blog - Admin",
		articles: articles,
	});
};

exports.getEditArticle = (req, res, next) => {
	res.render("edit-article", {
		pageTitle: "Personal Blog - Edit Article",
		inputDate: getFormattedDateForInput(),
	});
};

exports.getAddArticle = (req, res, next) => {
	res.render("add-article", {
		pageTitle: "Personal Blog - Add Article",
		inputDate: getFormattedDateForInput(),
	});
};

exports.postAddArticle = (req, res, next) => {
	const article = new Article(req.body.title, req.body.date, req.body.content);
	article.addArticle();
	res.redirect("/admin");
};
