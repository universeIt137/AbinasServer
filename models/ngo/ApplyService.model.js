let mongoose = require("mongoose");
let Schema = mongoose.Schema;

const applyServiceSchema = new Schema(
  {
    userName: {
      type: String,
    },
    userPhone: {
      type: String,
    },
    serviceName: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "complete"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const ApplyService = mongoose.model("applyService", applyServiceSchema);

module.exports = ApplyService;
