const { format, addMonths } = require("date-fns");
let Dps = require("../../models/ngo/dps.model.js");
const {
  getPaymentHistory,
  getLastDateOfMonth,
} = require("../../utils/paymentHistory.js");


const User = require("../../models/ngo/User.js");
const UserApplication = require("../../models/ngo/UserApplication.model.js");
const dpsUtiles = require("../../utils/dps.utiles.js");

const createAdps = async (payload) => {
  const { memberID, dpsNumber } = payload;
  if (dpsNumber) {
    await Dps.findOneAndDelete({ dpsNo: dpsNumber });
  }

  const user = await UserApplication.findOne({ memberId: memberID });
  // console.log("member id", user, memberID);
  if (!user) {
    throw new Error("user not found");
  }
  const dpsNo = await dpsUtiles.generateDpsNo();

  payload.dpsNo = dpsNo;
  payload.userId = user._id;
  const result = await Dps.create(payload);

  return result;
};

const updateDps = async (id) => {
  const result = await Dps.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const getAllDps = async (query) => {
  const result = await Dps.find(query)
    .sort({
      _id: -1,
    })
    .populate("userId");

  return result;
};

const approveDps = async (id) => {
  const isDpsExist = await Dps.findById({ _id: id });

  const {
    noOfInstallment,
    monthlyInstAmount,
    interestRate,
    openingDate,
    paymentAmount,
    lastPayDate,
    trnxIDCheckNoOthers,
    firstInstallmentAmount,
  } = isDpsExist;

  const paymentHisotry = getPaymentHistory(
    noOfInstallment,
    monthlyInstAmount,
    interestRate,
    openingDate,
    paymentAmount,
    lastPayDate
  );

  const updateDpsPayment = await Dps.findOneAndUpdate(
    {
      _id: id,
      approveStatus: "pending",
    },
    {
      paymentHistory: paymentHisotry,
      $set: { approveStatus: "approved", dpsStatus: "active" },
    },
    { new: true }
  );

  if (!updateDpsPayment) {
    throw new Error("dps not approved.");
  }

  await payInstallment(
    {
      installmentNo: 1,
      trnxIDCheckNoOthers: trnxIDCheckNoOthers
        ? trnxIDCheckNoOthers
        : "unavilable",
      payAmount: firstInstallmentAmount,
    },
    id
  );

  return updateDpsPayment;
};

const payInstallment = async (payload, id) => {
  const {
    installmentNo,
    trnxIDCheckNoOthers,
    payAmount,
    adminName,
    adminPhone,
  } = payload;
  let amount = Number(payAmount);
  const findDps = await Dps.findById({
    _id: id,
  });
  if (payAmount > Number(findDps?.principleAmount)) {
    throw new Error("not enough amount to return");
  }
  const current = findDps.paymentHistory.find(
    (history) => history.installmentNo === installmentNo
  );
  if (current?.paymentAmount) {
    amount += current?.paymentAmount;
  }

  const excessInstallment = Math.ceil(
    amount / Number(findDps?.monthlyInstAmount)
  );

  const installmentObjectsToUpdate = findDps.paymentHistory.filter(
    (history) =>
      history.installmentNo >= installmentNo &&
      history.installmentNo < installmentNo + excessInstallment
  );

  amount -= current.paymentAmount;

  const date = new Date();
  const payDate = date.toISOString().split("T")[0];

  // calculate dpscollection
  await calculatDpsCollection(id, {
    amount: amount,
    trnxIDCheckNoOthers: trnxIDCheckNoOthers,
    adminName: adminName,
    adminPhone: adminPhone,
    lateFeeAmount: payload?.lateFeeAmount ? payload?.lateFeeAmount : 0,
  });

  // Process the installments to update
  let promises = installmentObjectsToUpdate.map((installmentObject) => {
    return new Promise(async (resolve, reject) => {
      const remainingPayment = Number(
        installmentObject.monthlyInstAmount - installmentObject.paymentAmount
      );
      const paymentAmount = Math.min(amount, remainingPayment);

      const paymentStatus =
        paymentAmount >= Number(installmentObject.monthlyInstAmount)
          ? date > new Date(installmentObject.lastDate)
            ? "late paid"
            : "paid"
          : "unpaid";
      // Calculate the payment amount for the installment

      installmentObject.paymentStatus =
        remainingPayment && paymentAmount >= remainingPayment
          ? "paid"
          : paymentStatus;
      installmentObject.trnxIDCheckNoOthers = trnxIDCheckNoOthers;
      installmentObject.payDate = payDate;
      installmentObject.paymentAmount += paymentAmount;
      amount -= paymentAmount;
      resolve();
    });
  });
  await Promise.all(promises);
  const totalPaid = findDps.paymentHistory.reduce(
    (total, installment) => total + installment.paymentAmount,
    0
  );
  findDps.totalPaid = totalPaid;

  await findDps.save();
};

const returnAmount = async (payload, id) => {
  const { returnAmount, adminName, adminPhone, trnxIDCheckNoOthers } = payload;

  const findDps = await Dps.findById({ _id: id });

  if (!findDps) {
    throw new Error("Dps document not found");
  }

  if (findDps.dpsStatus !== "closed") {
    throw new Error("dps is runnig. please close it");
  }
  const returnDue =
    Number(findDps?.adjustableMatureAmount) - Number(findDps?.totalReturn);

  if (returnDue >= returnAmount) {
    const date = new Date();

    const result = await Dps.findByIdAndUpdate(
      id,
      {
        $push: {
          dpsReturn: {
            adminName: adminName,
            adminPhone: adminPhone,
            returnDate: date.toISOString().split("T")[0],
            trnxIDCheckNoOthers: trnxIDCheckNoOthers,
            amount: Number(returnAmount),
          },
        },

        $set: {
          totalReturn: Number(findDps?.totalReturn) + Number(returnAmount),
        },
      },
      { new: true }
    );

    if (!result) {
      throw new Error("Failed to update Dps document");
    }

    return result;
  } else {
    throw new Error("not enough amount to return");
  }
};

const closeDps = async (payload, id) => {
  const findDps = await Dps.findById({ _id: id });
  if (!findDps) {
    throw new Error("dps not found");
  }
  const result = await Dps.findByIdAndUpdate(
    { _id: id, dpsStatus: { $in: ["active"] } },
    {
      $set: {
        dpsStatus: "closed",
        adjustableMatureAmount: payload?.adjustableMatureAmount,
      },
    }
  );
  return result;
};

const calculatDpsCollection = async (id, payload) => {
  try {
    const findDps = await Dps.findOne({ _id: id });
    const date = new Date().toISOString().split("T")[0];
    payload.date = date;

    const result = await Dps.findOneAndUpdate(
      { _id: id },
      {
        $push: {
          dpsCollection: payload,
        },
        $set: {
          totalLateFeePaid:
            Number(findDps?.totalLateFeePaid) + Number(payload?.lateFeeAmount),
        },
      },
      {
        new: true,
      }
    );

    return result;
  } catch (err) {
    throw new Error(err.message);
  }
};
const dpsServices = {
  createAdps,
  getAllDps,
  approveDps,
  payInstallment,
  returnAmount,
  closeDps,
  updateDps,
  calculatDpsCollection,
};

module.exports = dpsServices;

// const result = await Dps.findOneAndUpdate(
//   {
//     _id: id,
//     "paymentHistory.installmentNo": installmentNo,
//   },

//   {
//     $set: {
//       "paymentHistory.$.paymentStatus":
//         date > new Date(findPaymentHistory?.lastDate) ? "late paid" : "paid",
//       "paymentHistory.$.trnxIDCheckNoOthers": trnxIDCheckNoOthers,
//       "paymentHistory.$.paymentAmount": findPaymentHistory?.monthlyInstAmount,
//       "paymentHistory.$.payDate": payDate,
//     },
//     $inc: {
//       totalPaid: findPaymentHistory.monthlyInstAmount,
//     },
//   },
//   { new: true }
// );
// return result;
