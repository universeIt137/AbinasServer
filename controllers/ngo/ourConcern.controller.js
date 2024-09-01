const httpStatus = require("http-status");
const concernServices = require("../../services/ngo/ourConcern.service");
const httpResponse = require("../../utils/httpResponse");

async function createOurConcern(req, res) {
  try {
    const result = await concernServices.postConcern(req.body);
    res
      .status(200)
      .json(
        httpResponse("success", result, "our concern  created successfully")
      );
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function getOurConcern(req, res) {
  try {
    const result = await concernServices.getOurConcern();
    res
      .status(200)
      .json(
        httpResponse("success", result, "our concern  retrive successfully")
      );
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}
async function deleteOurConcern(req, res) {
  try {
    const result = await concernServices.deleteOurConcern(req.params.id);
    res
      .status(200)
      .json(httpResponse("success", result, "deleted successfully"));
  } catch (err) {
    res
      .status(httpStatus.BAD_REQUEST)
      .json(httpResponse("failed", {}, err.message));
  }
}

let ourConcernController = {
  createOurConcern,
  getOurConcern,
  deleteOurConcern,
};
module.exports = ourConcernController;
