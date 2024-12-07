const express = require("express");

const articlesController = require("../controllers/articles");

const router = express.Router();

router.get("/article/:id", articlesController.getArticle);

router.get("/", articlesController.getFrontendArticles);

module.exports = router;
