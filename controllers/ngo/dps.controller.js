const { dpsQueryKeys } = require("../../constant/constant.js");
let dpsServices = require("../../services/ngo/dps.service.js");
let httpResponse = require("../../utils/httpResponse.js");
const pick = require("../../utils/query.js");

const createAdps = async (req, res) => {
  try {
    let result = await dpsServices.createAdps(req.body);
    res
      .status(200)
      .json(httpResponse("success", result, "dps created successfully"));
  } catch (err) {
    res.status(500).json(httpResponse("failed", {}, err.message));
  }
};
const getAllDps = async (req, res) => {
  try {
    const query = pick(req.query, dpsQueryKeys);
    let result = await dpsServices.getAllDps(query);
    res
      .status(200)
      .json(httpResponse("success", result, "dps retrive successfully"));
  } catch (err) {
    res.status(500).json(httpResponse("failed", {}, err.message));
  }
};
// const getSingleDps = async (req, res) => {
//   try {
//     let result = await dpsServices.getSingleDps(req.params.id);
//     res
//       .status(200)
//       .json(httpResponse("success", result, "dps retrive successfully"));
//   } catch (err) {
//     res
//       .status(500)
//       .json(httpResponse("failed", result, "something went wrong"));
//   }
// };

const updateDps = async (req, res) => {
  try {
    const result = await dpsServices.updateDps(req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "dps updated sucessfully"));
  } catch (err) {
    res.status(500).json(httpResponse("failed", {}, err.message));
  }
};
//
const approveDps = async (req, res) => {
  try {
    const result = await dpsServices.approveDps(req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "dps approved sucessfully"));
  } catch (err) {
    res.status(500).json(httpResponse("failed", {}, err.message));
  }
};

const payInstallment = async (req, res) => {
  try {
    // console.log("payInstallment: ");
    // console.log(req.body);
    const result = await dpsServices.payInstallment(req.body, req.params.id);
    res
      .status(200)
      .json(
        httpResponse(
          "success",
          result,
          "congrats!! your installment successfully paid"
        )
      );
  } catch (err) {
    res.status(200).json(httpResponse("success", {}, err.message));
  }
};

const returnAmount = async (req, res) => {
  try {
    const result = await dpsServices.returnAmount(req.body, req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "successfully returned"));
  } catch (err) {
    console.log(err);
    res.status(500).json(httpResponse("failed", {}, err.message));
  }
};

const closeDps = async (req, res) => {
  try {
    // console.log(req.body);
    const result = await dpsServices.closeDps(req.body, req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "successfully closed the dps"));
  } catch (err) {
    console.log(err);
    res.status(500).json(httpResponse("failed", {}, err.message));
  }
};
// const calculateLateFee = async (req, res) => {
//   try {
//     const result = await dpsServices.calculateLateFee(req.params.id, req.body);
//     res.status(200).json(httpResponse("success", result, "success"));
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(httpResponse("failed", {}, err.message));
//   }
// };

const dpsController = {
  createAdps,
  getAllDps,
  approveDps,
  payInstallment,
  returnAmount,
  closeDps,
  // calculateLateFee,
  updateDps,
};

module.exports = dpsController;
