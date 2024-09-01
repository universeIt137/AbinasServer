const ApplyService = require("../../models/ngo/ApplyService.model");

const createApplyServices = async (data) => {
  result = await ApplyService.create(data);
  return result;
};
const getAllApplyServices = async () => {
  result = await ApplyService.find({});
  return result;
};

let ApplyServices = {
  createApplyServices,
  getAllApplyServices,
};
module.exports = ApplyServices;
