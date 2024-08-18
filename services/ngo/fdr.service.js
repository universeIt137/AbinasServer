const UserApplication = require("../../models/ngo/UserApplication.model");
const Fdr = require("../../models/ngo/fdr.model");
const { generateFdrNo } = require("../../utils/fdr.utiles");

const createAFdr = async (payload) => {
  const { memberID, fdrType } = payload;

  const user = await UserApplication.findOne({ memberId: memberID });

  console.log("user: " + user);
  console.log("memberID: " + memberID);

  if (!user) {
    throw new Error("user not found");
  }

  const fdrNo = await generateFdrNo(fdrType);
  payload.fdrNo = fdrNo;
  payload.userId = user._id;
  const result = await Fdr.create(payload);
  return result;
};

const getallFdr = async (query) => {
  const result = await Fdr.find(query)
    .sort({
      createdAt: -1,
    })
    .populate("userId");
  return result;
};

const getSingleFdr = async (id) => {
  const result = await Fdr.findById(id);
  return result;
};
const updateFdr = async (id, payload) => {
  const result = await Fdr.findByIdAndUpdate(id, payload, { new: true });
  return result;
};
const approveStatus = async (id) => {
  const result = await Fdr.findByIdAndUpdate(
    id,
    {
      $set: {
        status: "approved",
      },
    },
    { new: true }
  );
  return result;
};

const closeFdr = async (id, payload) => {
  const ExistFdr = await Fdr.findById(id);

  if (!ExistFdr) {
    throw new Error("Fdr Not Found");
  }

  const result = await Fdr.findByIdAndUpdate(
    id,
    {
      $set: {
        status: "closed",
        adjustableMatureAmount: ExistFdr?.matureAmount,
      },
    },
    { new: true }
  );
  return result;
};
const returnAmount = async (id, payload) => {
  const findFdr = await Fdr.findById(id);
  if (!findFdr) {
    throw new Error("fdr not found");
  }
  if (findFdr?.status !== "closed") {
    throw new Error("fdr is not close yet! plese close and try again");
  }
  const returnDue =
    Number(findFdr?.matureAmount) - Number(findFdr?.totalReturn);
  if (Number(payload?.matureAmount) > returnDue) {
    throw new Error("not enough amount to withdraw");
  }
  const result = await Fdr.findByIdAndUpdate(
    id,
    {
      $push: {
        returnHistory: payload?.returnHistory,
      },
      $inc: {
        totalReturn: Number(payload?.matureAmount),
      },
    },
    { new: true }
  );
  return result;
};

const fdrServices = {
  createAFdr,
  getallFdr,
  getSingleFdr,
  updateFdr,
  approveStatus,
  closeFdr,
  returnAmount,
};

module.exports = fdrServices;

// const { type } = payload;
// let fdrNo;
// if (type === "single") {
//   fdrNo = await generateFdrNo("SI");
// } else if (type === "double") {
//   fdrNo = await generateFdrNo("DO");
// }
// payload.fdrNo = fdrNo;
