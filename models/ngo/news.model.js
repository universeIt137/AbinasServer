let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const newsSchema = new Schema(
  {
    title: {
      type: String,
      require: [true, "title is required"],
    },
    newsImage: {
      type: String,
    },
    keyword: {
      type: String,
      require: [true, "keyword is required"],
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("news", newsSchema);

module.exports = News;
