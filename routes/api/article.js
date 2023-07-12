const express = require("express");
const router = express.Router();
const Article = require("../models/article");

// Get all articles
router.get("/", (req, res, next) => {
  Article.find()
    .then((articles) => {
      res.status(200).json(articles);
    })
    .catch(next);
});

// Create a new article
router.post("/", (req, res, next) => {
  const { title, body, author, topic } = req.body;
  Article.create({ title, body, author, topic })
    .then((newArticle) => {
      res.status(201).json(newArticle);
    })
    .catch(next);
});

// Update an article
router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { title, body, author, topic } = req.body;
  Article.findByIdAndUpdate(id, { title, body, author, topic }, { new: true })
    .then((updatedArticle) => {
      if (!updatedArticle) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.status(200).json(updatedArticle);
    })
    .catch(next);
});

// Delete an article
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Article.findByIdAndDelete(id)
    .then((deletedArticle) => {
      if (!deletedArticle) {
        return res.status(404).json({ error: "Article not found" });
      }
      res.status(200).json({ message: "Article deleted successfully" });
    })
    .catch(next);
});

module.exports = router;
