const express = require("express");
const router = express.Router();
const News = require("../../models/News");
const upload = require("../../middleware/upload");

// Get all topics   
router.get("/", (req, res, next) => {
  News.find()
    .then((topics) => {
      res.status(200).json(topics);
    })
    .catch(next);
});

// Create a new newsName
router.post("/", (req, res, next) => {
  const { newsName, newsDescription,newsPoster } = req.body;
  News.create({ newsName, newsDescription, newsPoster })
    .then((newTopic) => {
      res.status(201).json(newTopic);
    })
    .catch(next);
});

// Update a newsName
router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  const { newsName, newsDescription,newsPoster } = req.body;
  News.findByIdAndUpdate(id, { newsName, newsDescription,newsPoster }, { new: true })
    .then((updatedTopic) => {
      if (!updatedTopic) {
        return res.status(404).json({ error: "News not found" });
      }
      res.status(200).json(updatedTopic);
    })
    .catch(next);
});

// // Delete a newsName
// router.delete("/:id", (req, res, next) => {
//   const { id } = req.params;
//   News.findByIdAndDelete(id)
//     .then((deletedTopic) => {
//       if (!deletedTopic) {
//         return res.status(404).json({ error: "News not found" });
//       }
//       res.status(200).json({ message: "News deleted successfully" });
//     })
//     .catch(next);
// });

router.post("/upload", upload,(req, res, next) => {
  try {
      if (req.file == undefined) {
          return res.status(400).send("Please upload a file!");
      }
      res.status(200).send({
          message: "Uploaded the file successfully: " + req.file.originalname,
          image_url: `http://localhost:3000/public/${req.file.originalname}`
      });
  } catch (err) {
      res.status(500).send({
          message: `Could not upload the file: ${req.file.originalname}. ${err}`,
      });
  }
}
);

module.exports = router;
