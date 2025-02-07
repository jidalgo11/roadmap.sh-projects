const { Article } = require("../models/article");

const { getFormattedDateForInput } = require("../utils/dateHelper");

exports.getAdmin = (req, res, next) => {
	const articles = Article.fetchArticles();
	res.render("admin", {
		pageTitle: "Personal Blog - Admin",
		articles: articles,
		path: "/admin",
		navLinks: "admin",
	});
};

exports.getAddArticle = (req, res, next) => {
	res.render("add-article", {
		pageTitle: "Personal Blog - Add Article",
		inputDate: getFormattedDateForInput(),
	});
};

exports.getEditArticle = (req, res, next) => {
	const articleId = parseInt(req.params.id, 10);
	const article = Article.fetchArticles().find(
		(article) => article.id === articleId
	);

	res.render("edit-article", {
		pageTitle: "Personal Blog - Edit Article",
		article: article,
		inputDate: getFormattedDateForInput(),
	});
};

exports.postAddArticle = (req, res, next) => {
	const article = new Article(req.body.title, req.body.date, req.body.content);
	article.addArticle();
	res.redirect("/admin");
};

exports.postEditArticle = (req, res, next) => {
	const id = parseInt(req.params.id, 10);
	const editedData = {
		title: req.body.title,
		date: req.body.date,
		content: req.body.content,
	};

	Article.editArticle(id, editedData);
	res.redirect("/admin");
};

exports.deleteArticle = (req, res, next) => {
	const id = parseInt(req.params.id, 10);

	Article.deleteArticle(id);
	res.redirect("/admin");
};
