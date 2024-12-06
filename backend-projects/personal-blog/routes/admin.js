const express = require("express");

const articlesController = require("../controllers/articles");

const router = express.Router();

router.get("/admin", articlesController.getAdminArticles);

router.get("/edit-article", articlesController.getEditArticle);

router.get("/add-article", articlesController.getAddArticle);

router.post("/add-article", articlesController.postAddArticle);

module.exports = router;
