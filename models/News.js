const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  newsName: {
    type: String,
    required: true,
  },

  newsPoster: {
    type: String,
    required: true,
    },

    newsDescription: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("News", NewsSchema);
