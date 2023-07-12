const mongoose = require("mongoose");
const ArticleSchema = {
    article_id: {
      type: Integer,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: String,
      required: true
    },
    body: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    topic: {
      type: String,
      required: true
    },
    votes: {
      type: Integer,
      default: 0
    },
    created_at: {
      type: Timestamp,
      default: currentTimestamp 
    }
  };

  
module.exports = mongoose.model("article", ArticleSchema);

  