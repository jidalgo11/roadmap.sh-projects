const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "articles.json");

class Article {
	constructor(title, date, content) {
		this.id = this.generateArticleId(Article.fetchArticles());
		this.title = title;
		this.date = Article.formatArticleDate(date);
		this.content = content;
	}

	addArticle() {
		const articles = Article.fetchArticles();
		articles.push(this);
		Article.writeArticles(articles);
	}

	static writeArticles(articles) {
		fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), "utf-8");
	}

	static editArticle(id, updatedData) {
		const articles = Article.fetchArticles();
		const articleIndex = articles.findIndex((article) => {
			return article.id === id;
		});

		const article = articles[articleIndex];

		article.title = updatedData.title;
		article.date = Article.formatArticleDate(updatedData.date);
		article.content = updatedData.content;

		this.writeArticles(articles);
	}

	static deleteArticle(id) {
		const articles = Article.fetchArticles();
		const articleIndex = articles.findIndex((article) => {
			return article.id === id;
		});

		articles.splice(articleIndex, 1);
		this.writeArticles(articles);
	}

	static fetchArticles() {
		const data = fs.readFileSync(filePath, "utf-8");
		return JSON.parse(data || "[]");
	}

	generateArticleId(articles) {
		if (!articles || articles.length === 0) {
			return 1;
		}
		const maxId = articles.reduce(
			(max, article) => (article.id > max ? article.id : max),
			0
		);
		return maxId + 1;
	}

	static formatArticleDate(articleDate) {
		const currentDate = new Date(articleDate);
		const options = {
			year: "numeric",
			month: "short",
			day: "numeric",
			timeZone: "UTC",
		};
		const formattedDate = currentDate.toLocaleDateString("en-US", options);

		return formattedDate;
	}
}

module.exports = { Article };
