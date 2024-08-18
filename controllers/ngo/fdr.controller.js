const { fdrQueryKeys } = require("../../constant/constant");
const fdrServices = require("../../services/ngo/fdr.service");
const httpResponse = require("../../utils/httpResponse");
const pick = require("../../utils/query");

const createAFdr = async (req, res) => {
  try {
    const result = await fdrServices.createAFdr(req.body);
    res
      .status(200)
      .json(httpResponse("success", result, "fdr created successfully"));
  } catch (err) {
    res.status(500).json(httpResponse("failed", {}, err.message));
  }
};

const getallFdr = async (req, res) => {
  try {
    const query = pick(req.query, fdrQueryKeys);
    const result = await fdrServices.getallFdr(query);
    res
      .status(200)
      .json(httpResponse("success", result, "fdr retrive successfully"));
  } catch (err) {
    res.status(500).json(httpResponse("failed", {}, err.message));
  }
};
const getSingleFdr = async (req, res) => {
  try {
    const result = await fdrServices.getSingleFdr(req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "fdr retrive successfully"));
  } catch (err) {
    res.status(500).json(httpResponse("failed", {}, err.message));
  }
};
const updateFdr = async (req, res) => {
  try {
    const result = await fdrServices.updateFdr(req.params.id, req.body);
    res
      .status(200)
      .json(httpResponse("success", result, "fdr updated successfully"));
  } catch (err) {
    res.status(500).json(httpResponse("failed", {}, err.message));
  }
};
const approveStatus = async (req, res) => {
  try {
    const result = await fdrServices.approveStatus(req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "fdr status approved"));
  } catch (err) {
    res.status(500).json(httpResponse("failed", {}, err.message));
  }
};
const closeFdr = async (req, res) => {
  try {
    const result = await fdrServices.closeFdr(req.params.id, req.body);
    res
      .status(200)
      .json(httpResponse("success", result, "fdr status approved"));
  } catch (err) {
    res.status(500).json(httpResponse("failed", {}, err.message));
  }
};
const returnAmount = async (req, res) => {
  try {
    const result = await fdrServices.returnAmount(req.params.id, req.body);
    res
      .status(200)
      .json(
        httpResponse("success", result, "fdr amount withdraw successfully")
      );
  } catch (err) {
    res.status(500).json(httpResponse("failed", {}, err.message));
  }
};

const fdrcontrollers = {
  createAFdr,
  getallFdr,
  getSingleFdr,
  updateFdr,
  approveStatus,
  closeFdr,
  returnAmount,
};
module.exports = fdrcontrollers;
