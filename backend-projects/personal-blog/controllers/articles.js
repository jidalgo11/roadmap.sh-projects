const { Article } = require("../models/article");

exports.getFrontendArticles = (req, res, next) => {
	const articles = Article.fetchArticles();
	res.render("index", {
		pageTitle: "Personal Blog",
		articles: articles,
		navLinks: "blog",
		path: "/",
	});
};

exports.getArticle = (req, res, next) => {
	const articles = Article.fetchArticles();
	const articleId = parseInt(req.params.id, 10);
	const article = articles.find((article) => article.id === articleId);
	res.render("article", {
		pageTitle: article.title,
		article,
	});
};
