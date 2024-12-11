const express = require("express");

const articlesController = require("../controllers/articles");

const router = express.Router();

router.get("/admin", articlesController.getAdminArticles);

router.get("/edit-article/:id", articlesController.getEditArticle);

router.get("/add-article", articlesController.getAddArticle);

router.post("/add-article", articlesController.postAddArticle);

router.post("/edit-article/:id", articlesController.postEditArticle);

module.exports = router;
