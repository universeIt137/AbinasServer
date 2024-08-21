let mongoose = require("mongoose");
let Schema = mongoose.Schema;
const servicesSchema = new Schema(
  {
    serviceName: {
      type: String,
      // required: [true, "service name is required"],
    },
    serviceImage: {
      type: String,
    },
    title: {
      type: String,
      // required: [true, "title is required"],
    },
    description: {
      type: String,
    },
    keyFeatures: [],
    specialNote: [],
  },
  {
    timestamps: true,
  }
);

const Services = mongoose.model("service", servicesSchema);

module.exports = Services;
