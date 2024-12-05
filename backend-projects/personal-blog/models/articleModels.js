const fs = require("fs");
const path = require("path");

const rootDir = require("../util/path");

const filePath = path.join(rootDir, "data", "articles.json");

const getArticles = () => {
	const data = fs.readFileSync(filePath, "utf-8");
	return JSON.parse(data || "[]");
};

module.exports = { getArticles };
