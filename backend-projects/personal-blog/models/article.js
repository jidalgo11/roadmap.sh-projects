const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "..", "data", "articles.json");

class Article {
	constructor(title, date, content) {
		this.id = this.generateArticleId(Article.fetchArticles());
		this.title = title;
		this.date = this.formatArticleDate(date);
		this.content = content;
	}

	addArticle() {
		const articles = Article.fetchArticles();
		articles.push(this);
		this.writeArticles(articles);
	}

	static fetchArticles() {
		const data = fs.readFileSync(filePath, "utf-8");
		return JSON.parse(data || "[]");
	}

	writeArticles(articles) {
		fs.writeFileSync(filePath, JSON.stringify(articles, null, 2), "utf-8");
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

	formatArticleDate(articleDate) {
		const currentDate = new Date(articleDate);
		const options = { year: "numeric", month: "long", day: "numeric" };
		const formattedDate = currentDate.toLocaleDateString("en-US", options);

		return formattedDate;
	}
}

module.exports = { Article };
