const { getArticles, saveArticles } = require("../models/articleModels");

const { generateArticleId } = require("../utils/idGenerator");

const addArticle = (title, content) => {
	const articles = getArticles();
	const newArticle = {
		id: generateArticleId(articles),
		title,
		content,
	};
	articles.push(newArticle);
	saveArticles(articles);
};

module.exports = { addArticle };
