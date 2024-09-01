const mongoose = require("mongoose");
const DpspaymentHistory = require("./dps.paymentHistory.model");
// Define the schema
const dpsSchema = new mongoose.Schema(
  {
    dpsNo: {
      type: String,
      required: true,
      unique: true,
    },
    dpsStatus: {
      type: String,
      enum: ["active", "closed"],
      default: "active",
    },
    totalLateFeePaid: {
      type: Number,
      default: 0,
    },

    lastPayDate: {
      type: Number,
      required: [true, "last pay date is required"],
    },
    totalPaid: {
      type: Number,
      default: 0,
    },
    firstInstallmentAmount: {
      type: Number,
      default: 0,
    },
    lateFee: {
      type: Number,
      required: [true, "late fee is required"],
    },
    dpsCollection: [
      {
        date: String,
        amount: Number,
        lateFeeAmount: {
          type: Number,
          default: 0,
        },
        trnxIDCheckNoOthers: String,
        adminName: String,
        adminPhone: Number,
      },
    ],

    trnxIDCheckNoOthers: {
      type: String,
    },
    returnableAmount: {
      type: Number,
      default: 0,
    },
    totalReturn: {
      type: Number,
      default: 0,
    },
    returnDue: {
      type: Number,
      default: 0,
    },

    dpsReturn: [
      {
        adminName: {
          type: String,
          require: [true, "admin name is required"],
        },
        adminPhone: {
          type: Number,
        },
        returnDate: {
          type: String,
          require: [true, "date  is required"],
        },
        trnxIDCheckNoOthers: {
          type: String,
        },
        amount: {
          type: Number,
          require: [true, "amount  is required"],
        },
      },
    ],
    openingDate: {
      type: String,
      required: [true, "date id is required"],
    },
    memberID: {
      type: String,
      required: true,
      required: [true, "member id is required"],
    },
    duration: {
      type: Number,
      required: [true, "inst amount id is required"],
    },
    noOfInstallment: {
      type: Number,
      required: [true, "number of installment id is required"],
    },
    interestRate: {
      type: Number,
      required: [true, "interestRate  is required"],
    },

    monthlyInstAmount: {
      type: Number,
      required: [true, "monthly inst Amount id is required"],
    },

    trnxIDCheckNoOthers: {
      type: String,
    },
    naration: {
      type: String,
    },
    lastPayDate: {
      type: String,
    },
    approveStatus: {
      type: String,
      enum: ["pending", "approved"],
      default: "pending",
    },
    principleAmount: {
      type: Number,
      required: [true, "principle amount  is required"],
    },
    matureAmount: {
      type: Number,
      required: [true, "matureAmount   is required"],
    },
    adjustableMatureAmount: {
      type: Number,
      default: 0,
    },
    adjustReturnableAmount: {
      type: Number,
      default: 0,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userApplication",
    },
    paymentHistory: [
      {
        lastDate: {
          type: String,
        },
        payDate: {
          type: String,
          default: "",
        },
        trnxIDCheckNoOthers: {
          type: String,
          default: "",
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
        paymentAmount: {
          type: Number,
          default: 0,
        },
        due: {
          type: Number,
          default: 0,
        },
        payAmount: {
          type: Number,
          default: 0,
        },
        paymentStatus: {
          type: String,
          enum: ["paid", "unpaid", "late", "late paid"],
          default: "unpaid",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Create the model
const Dps = mongoose.model("dps", dpsSchema);

module.exports = Dps;
