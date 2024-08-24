let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const concernSchema = new Schema(
  {
    name: String,
    description: String,

    location: {
      type: String,
    },
    contact: {
      phone: String,
      email: String,
      facebook: String,
    },
  },
  {
    timestamps: true,
  }
);

const Concern = mongoose.model("concern", concernSchema);

module.exports = Concern;
