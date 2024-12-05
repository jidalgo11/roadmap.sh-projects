const generateArticleId = (articles) => {
	if (!articles || articles.length === 0) {
		return 1;
	}
	const maxId = articles.reduce(
		(max, article) => (article.id > max ? article.id : max),
		0
	);
	return maxId + 1;
};

module.exports = { generateArticleId };
