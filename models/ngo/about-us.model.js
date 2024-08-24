let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const aboutUsSchema = new Schema(
  {
    name: {
      type: String,
    },
    aboutImage: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const AboutUs = mongoose.model("about", aboutUsSchema);

module.exports = AboutUs;
