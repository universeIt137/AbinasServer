const mongoose = require("mongoose");

const fdrSchema = new mongoose.Schema(
  {
    fdrNo: {
      type: String,
      unique: true,
    },

    fdrType: {
      type: String,
      enum: ["single", "double"],
    },
    memberID: {
      type: String,
      required: [true, "memberId is required"],
    },
    fdrType: {
      type: String,
      enum: ["single", "double"],
    },
    userId: {
      type: mongoose?.Schema.Types.ObjectId,
      ref: "userApplication",
    },
    interestRate: {
      type: Number,
      ref: "userApplication",
    },
    naration: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "closed"],
      default: "pending",
    },
    schemeCondition: [
      {
        insrate: Number,
        mAmountWithVat: Number,
        matureAmountWithOutVat: Number,
        matureDate: String,
        principleAmount: Number,
        vat: Number,
        year: Number,
      },
    ],
    principleAmount: {
      type: Number,
      required: [true, "principle amount is required"],
    },
    matureAmount: {
      type: Number,
      required: [true, "mature amount is required"],
    },
    adjustableMatureAmount: {
      type: Number,
      default: 0,
    },
    vat: {
      type: Number,
    },
    perInterestPayment: {
      type: Number,
    },
    openingDate: {
      type: String,
    },
    duration: {
      type: Number,
      required: [true, "duration is required"],
    },
    paymentMethod: {
      type: String,
      enum: ["bank", "cash", "mobileBanking"],
    },
    trnxIDCheckNoOthers: {
      type: String,
    },
    narration: {
      type: String,
    },
    totalReturn: {
      type: Number,
      default: 0,
    },
    returnHistory: [
      {
        adminName: String,
        adminPhone: String,
        date: String,
        amount: Number,
        trnxIDCheckNoOthers: String,
      },
    ],
    interestCollectionDuration: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Fdr = mongoose.model("fdr", fdrSchema);

module.exports = Fdr;
