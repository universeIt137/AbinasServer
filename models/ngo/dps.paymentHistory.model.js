const mongoose = require("mongoose");

const paymentHistorySchema = new mongoose.Schema({
  dpsNo: {
    type: String,
    require: [true, "dps no is required"],
  },
  memberID: {
    type: String,
    require: [true, "member id is required"],
  },
  duration: {
    type: Number,
    require: [true, "duration is required"],
  },
  lastDate: {
    type: Date,
    require: [true, "last date is required"],
  },
  payDate: {
    type: Date,
    require: [true, "pay date is required"],
  },
  trnxIDCheckNoOthers: {
    type: String,
    require: [true, "trnx id  is required"],
  },
  interestRate: {
    type: Number,
    require: [true, "interest rate  is required"],
  },
  installmentNo: {
    type: Number,
    require: [true, "installment no  is required"],
  },
  monthlyInstAmount: {
    type: Number,
    require: [true, "monthlyInstallment  amount  is required"],
  },
  principleAmount: {
    type: Number,
  },
  matureAmount: {
    type: Number,
  },
  due: {
    type: Number,
    default: 0,
  },
  payment: {
    type: String,
    enum: ["paid", "unpaid"],
    default: "unpaid",
  },
  paymentStatus: {
    type: String,
    enum: ["paid", "unpaid", "late", "late paid"],
    default: "unpaid",
  },
});

const DpspaymentHistory = mongoose.model(
  "dpspaymentistory",
  paymentHistorySchema
);
module.exports = DpspaymentHistory;
