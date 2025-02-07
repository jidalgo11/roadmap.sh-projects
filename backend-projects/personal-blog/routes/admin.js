const express = require("express");

const adminController = require("../controllers/admin");

const router = express.Router();

router.get("/admin", adminController.getAdmin);

router.get("/edit-article/:id", adminController.getEditArticle);

router.get("/add-article", adminController.getAddArticle);

router.post("/add-article", adminController.postAddArticle);

router.post("/edit-article/:id", adminController.postEditArticle);

router.post("/delete-article/:id", adminController.deleteArticle);

module.exports = router;
